import { DataTypes, Model } from "sequelize";
import { sequelize } from "#config/db.config.js";
const SupportReplyModel = sequelize.define(
  "SupportReplyModel",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticket: { type: DataTypes.UUID, allowNull: false },
    sender: { type: DataTypes.UUID, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "support_replies",
    timestamps: true,
    updatedAt: false,
  },
);
export default SupportReplyModel;
