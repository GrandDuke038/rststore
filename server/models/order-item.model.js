import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.config.js";
const OrderItemModel = sequelize.define(
  "OrderItemModel",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order: { type: DataTypes.UUID, allowNull: false },
    product: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    qty: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    tableName: "order_items",
    timestamps: true,
    updatedAt: false,
  },
);
export default OrderItemModel;
