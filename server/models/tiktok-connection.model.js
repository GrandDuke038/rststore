import { DataTypes } from "sequelize";

import { sequelize } from "#config/db.config.js";

const TikTokConnectionModel = sequelize.define(
  "TikTokConnectionModel",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    openId: { type: DataTypes.STRING, allowNull: false, unique: true },
    displayName: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    accessToken: { type: DataTypes.TEXT, allowNull: false },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
    accessTokenExpiresAt: { type: DataTypes.DATE, allowNull: false },
    refreshTokenExpiresAt: { type: DataTypes.DATE, allowNull: false },
    scopes: { type: DataTypes.STRING, allowNull: false },
    connectedBy: { type: DataTypes.UUID, allowNull: true },
  },
  { tableName: "tiktok_connections", timestamps: true },
);

export default TikTokConnectionModel;
