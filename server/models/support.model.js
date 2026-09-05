import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.config.js";
const SupportModel = sequelize.define(
  "SupportModel",

  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: { type: DataTypes.UUID, allowNull: false },
    subject: { type: DataTypes.STRING(160), allowNull: false },
    category: {
      type: DataTypes.ENUM(
        "Order Issue",
        "Payment Issue",
        "Delivery Issue",
        "Product Issue",
        "Account Issue",
        "Technical Issue",
        "Other",
      ),
      allowNull: false,
    },
    message: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM("open", "in_progress", "resolved", "closed"),
      defaultValue: "open",
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    assignedTo: { type: DataTypes.UUID, allowNull: true },
  },
  {
    tableName: "support_tickets",
    timestamps: true,
    indexes: [
      { fields: ["user", "updatedAt"] },
      { fields: ["status", "category", "priority"] },
    ],
  },
);
export default SupportModel;
