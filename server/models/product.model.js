import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.config.js";

const ProductModel = sequelize.define(
  "ProductModel",
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

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },

    numReviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,

    indexes: [
      { fields: ["createdAt"] },
      { fields: ["name"] },
      { fields: ["brand"] },
      { fields: ["category"] },
    ],
  },
);

export default ProductModel;

/*import { DataTypes, Model } from "sequelize";
import { sequelize } from "#config/db.config.js";
class ProductModel extends Model {}
ProductModel.init(
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    numReviews: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    modelName: "ProductModel",
    tableName: "products",
    timestamps: true,
    indexes: [
      { fields: ["createdAt"] },
      { fields: ["name"] },
      { fields: ["brand"] },
      { fields: ["category"] },
    ],
  },
);
export default ProductModel;*/
