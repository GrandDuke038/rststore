import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

import Alert from "@components/Alert";
import Loader from "@components/Loader";

const AdminTikTokScreen = () => {
  const [params] = useSearchParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [status, setStatus] = useState(null);
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const load = async () => {
    try {
      setError("");
      const state = await axios.get("/api/v1/tiktok/status", config);
      setStatus(state.data);
      if (state.data.connected) {
        const response = await axios.get("/api/v1/tiktok/videos", config);
        setVideos(response.data.videos || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };
  useEffect(() => { load(); }, []);

  if (!status && !error) return <Loader />;
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">TikTok</h1>
          <p className="mt-2 text-slate-600">Connect the store’s account and view recent TikTok posts.</p>
        </div>
        <a href="/api/v1/tiktok/connect" className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700">
          {status?.connected ? "Reconnect TikTok" : "Connect TikTok"}
        </a>
      </div>
      {params.get("connection") === "success" && <Alert type="success">TikTok account connected successfully.</Alert>}
      {params.get("connection") === "failed" && <Alert type="error">TikTok connection was not completed. Please try again.</Alert>}
      {error && <Alert type="error">{error}</Alert>}
      {status && !status.configured && <Alert type="error">TikTok server settings are incomplete. Add the required variables in Render before connecting an account.</Alert>}
      {status?.connected && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <p className="font-semibold text-slate-900">Connected account</p>
          <p className="mt-1 text-sm text-slate-600">TikTok ID: {status.account.openId}</p>
          <p className="mt-1 text-sm text-slate-600">Permissions: {status.account.scopes}</p>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Recent videos</h2>
        {!status?.connected ? <p className="mt-3 text-slate-600">Connect an account to load its videos.</p> : videos === null ? <Loader /> : videos.length === 0 ? <p className="mt-3 text-slate-600">No public videos were returned by TikTok.</p> : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => <a key={video.id} href={video.share_url} target="_blank" rel="noreferrer" className="overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-md">
              {video.cover_image_url && <img src={video.cover_image_url} alt="TikTok video cover" className="aspect-video w-full object-cover" />}
              <div className="p-4"><p className="line-clamp-2 font-medium text-slate-900">{video.title || video.video_description || "Untitled video"}</p><p className="mt-2 text-sm text-slate-500">{video.view_count ?? 0} views · {video.comment_count ?? 0} comments</p></div>
            </a>)}
          </div>
        )}
      </div>
      <p className="mt-10 text-sm text-slate-500">Posting is added after TikTok approves the Content Posting API. Direct-message, comment-reply, and delete-video controls are not available through TikTok’s public creator API.</p>
      <Link to="/admin/product-list" className="mt-4 inline-block text-sm font-medium text-indigo-600">Back to admin</Link>
    </div>
  );
};

export default AdminTikTokScreen;
