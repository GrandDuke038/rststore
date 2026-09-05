import { DataTypes } from "sequelize";

import { sequelize } from "#config/db.config.js";

const OrderModel = sequelize.define(
  "OrderModel",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    user: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    shippingAddress: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    paymentResult: {
      type: DataTypes.JSON,
    },

    itemsPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    taxPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    shippingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    paidAt: {
      type: DataTypes.DATE,
    },

    isDelivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    deliveredAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "orders",
    timestamps: true,

    indexes: [
      {
        fields: ["user", "createdAt"],
      },
    ],
  },
);

export default OrderModel;
/*import { DataTypes, Model } from "sequelize";
import { sequelize } from "#config/db.config.js";
class OrderModel extends Model {}
OrderModel.init(
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: { type: DataTypes.UUID, allowNull: false },
    shippingAddress: { type: DataTypes.JSON, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    paymentResult: { type: DataTypes.JSON },
    itemsPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    taxPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    shippingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    isPaid: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    paidAt: { type: DataTypes.DATE },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deliveredAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "OrderModel",
    tableName: "orders",
    timestamps: true,
    indexes: [{ fields: ["user", "createdAt"] }],
  },
);
export default OrderModel;*/
