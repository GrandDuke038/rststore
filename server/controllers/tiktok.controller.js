import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
} from "node:crypto";

import asyncHandler from "express-async-handler";
import TikTokConnectionModel from "#models/tiktok-connection.model.js";

const apiBase = "https://open.tiktokapis.com";
const required = () => {
  for (const key of [
    "TIKTOK_CLIENT_KEY",
    "TIKTOK_CLIENT_SECRET",
    "TIKTOK_REDIRECT_URI",
    "TIKTOK_TOKEN_ENCRYPTION_KEY",
    "TIKTOK_OAUTH_STATE_SECRET",
  ])
    if (!process.env[key])
      throw new Error(`TikTok is not configured: missing ${key}`);
};
const tokenKey = () => {
  return createHash("sha256")
    .update(process.env.TIKTOK_TOKEN_ENCRYPTION_KEY)
    .digest();
};
const encrypt = (value) => {
  const iv = randomBytes(12),
    cipher = createCipheriv("aes-256-gcm", tokenKey(), iv);
  const text = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), text]
    .map((part) => part.toString("base64url"))
    .join(".");
};
const decrypt = (value) => {
  const [iv, tag, text] = value
    .split(".")
    .map((part) => Buffer.from(part, "base64url"));
  const decipher = createDecipheriv("aes-256-gcm", tokenKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(text), decipher.final()]).toString(
    "utf8",
  );
};
const signedState = (userId) => {
  const payload = `${userId}.${Date.now()}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${createHmac("sha256", process.env.TIKTOK_OAUTH_STATE_SECRET).update(payload).digest("base64url")}`;
};
const verifyState = (state) => {
  const pieces = state?.split(".");
  if (pieces?.length !== 4) return null;
  const payload = pieces.slice(0, 3).join(".");
  const signature = createHmac("sha256", process.env.TIKTOK_OAUTH_STATE_SECRET)
    .update(payload)
    .digest("base64url");
  return signature === pieces[3] && Date.now() - Number(pieces[1]) < 600000
    ? pieces[0]
    : null;
};
const requestToken = async (parameters) => {
  const response = await fetch(`${apiBase}/v2/oauth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(parameters),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error_description || "TikTok token request failed");
  return data;
};
const currentToken = async () => {
  required();
  const connection = await TikTokConnectionModel.findOne({
    order: [["updatedAt", "DESC"]],
  });
  if (!connection) throw new Error("No TikTok account is connected");
  if (connection.accessTokenExpiresAt.getTime() > Date.now() + 300000)
    return { connection, token: decrypt(connection.accessToken) };
  const data = await requestToken({
    client_key: process.env.TIKTOK_CLIENT_KEY,
    client_secret: process.env.TIKTOK_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: decrypt(connection.refreshToken),
  });
  await connection.update({
    accessToken: encrypt(data.access_token),
    refreshToken: encrypt(data.refresh_token),
    accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
    refreshTokenExpiresAt: new Date(
      Date.now() + data.refresh_expires_in * 1000,
    ),
    scopes: data.scope,
  });
  return { connection, token: data.access_token };
};
const tiktokRequest = async (path, token, options = {}) => {
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8",
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok || data.error?.code !== "ok")
    throw new Error(data.error?.message || "TikTok request failed");
  return data.data;
};
const startConnection = asyncHandler(async (req, res) => {
  required();
  const url = new URL("https://www.tiktok.com/v2/auth/authorize/");
  url.search = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY,
    response_type: "code",
    scope: "user.info.basic,video.list,video.publish",
    redirect_uri: process.env.TIKTOK_REDIRECT_URI,
    state: signedState(req.user._id),
  });
  res.redirect(url.toString());
});
const callback = asyncHandler(async (req, res) => {
  required();
  const userId = verifyState(req.query.state);
  if (!userId || req.query.error || !req.query.code)
    return res.redirect("/admin/tiktok?connection=failed");
  const data = await requestToken({
    client_key: process.env.TIKTOK_CLIENT_KEY,
    client_secret: process.env.TIKTOK_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: process.env.TIKTOK_REDIRECT_URI,
  });
  const values = {
    accessToken: encrypt(data.access_token),
    refreshToken: encrypt(data.refresh_token),
    accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
    refreshTokenExpiresAt: new Date(
      Date.now() + data.refresh_expires_in * 1000,
    ),
    scopes: data.scope,
    connectedBy: userId,
  };
  const connection = await TikTokConnectionModel.findOne({
    where: { openId: data.open_id },
  });
  if (connection) await connection.update(values);
  else await TikTokConnectionModel.create({ ...values, openId: data.open_id });
  res.redirect("/admin/tiktok?connection=success");
});
const status = asyncHandler(async (req, res) => {
  const connection = await TikTokConnectionModel.findOne({
    order: [["updatedAt", "DESC"]],
  });
  res.json({
    configured: Boolean(
      process.env.TIKTOK_CLIENT_KEY &&
      process.env.TIKTOK_CLIENT_SECRET &&
      process.env.TIKTOK_REDIRECT_URI &&
      process.env.TIKTOK_TOKEN_ENCRYPTION_KEY &&
      process.env.TIKTOK_OAUTH_STATE_SECRET,
    ),
    connected: Boolean(connection),
    account: connection && {
      openId: connection.openId,
      displayName: connection.displayName,
      avatarUrl: connection.avatarUrl,
      scopes: connection.scopes,
      connectedAt: connection.createdAt,
    },
  });
});
const listVideos = asyncHandler(async (req, res) => {
  const { token } = await currentToken();
  res.json(
    await tiktokRequest(
      "/v2/video/list/?fields=id,title,video_description,create_time,share_url,cover_image_url,duration,like_count,comment_count,share_count,view_count",
      token,
      {
        method: "POST",
        body: JSON.stringify({
          max_count: 20,
          cursor: Number(req.query.cursor) || 0,
        }),
      },
    ),
  );
});
const creatorInfo = asyncHandler(async (req, res) => {
  const { token } = await currentToken();
  res.json(
    await tiktokRequest("/v2/post/publish/creator_info/query/", token, {
      method: "POST",
      body: "{}",
    }),
  );
});

export { callback, creatorInfo, listVideos, startConnection, status };
