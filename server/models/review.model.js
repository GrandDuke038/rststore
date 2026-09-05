import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.config.js";
const ReviewModel = sequelize.define(
  "ReviewModel",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product: { type: DataTypes.UUID, allowNull: false },
    user: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: { type: DataTypes.TEXT, allowNull: false },
    isDemo: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "reviews",
    timestamps: true,
    indexes: [{ unique: true, fields: ["product", "user"] }],
  },
);
export default ReviewModel;
