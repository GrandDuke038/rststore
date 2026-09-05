import UserModel from "#models/user.model.js";
import ProductModel from "#models/product.model.js";
import ReviewModel from "#models/review.model.js";
import OrderModel from "#models/order.model.js";
import OrderItemModel from "#models/order-item.model.js";
import SupportModel from "#models/support.model.js";
import SupportReplyModel from "#models/support-reply.model.js";
let initialised = false;
export default function initialiseModels() {
  if (initialised) return;
  ProductModel.belongsTo(UserModel, { foreignKey: "user", as: "owner" });
  ReviewModel.belongsTo(ProductModel, {
    foreignKey: "product",
    as: "productRecord",
  });
  ReviewModel.belongsTo(UserModel, { foreignKey: "user", as: "reviewer" });
  ProductModel.hasMany(ReviewModel, { foreignKey: "product", as: "reviews" });
  OrderModel.belongsTo(UserModel, { foreignKey: "user", as: "userRecord" });
  OrderModel.hasMany(OrderItemModel, { foreignKey: "order", as: "orderItems" });
  OrderItemModel.belongsTo(ProductModel, {
    foreignKey: "product",
    as: "productRecord",
  });
  SupportModel.belongsTo(UserModel, { foreignKey: "user", as: "userRecord" });
  SupportModel.belongsTo(UserModel, {
    foreignKey: "assignedTo",
    as: "assignee",
  });
  SupportModel.hasMany(SupportReplyModel, {
    foreignKey: "ticket",
    as: "replies",
  });
  SupportReplyModel.belongsTo(UserModel, {
    foreignKey: "sender",
    as: "senderRecord",
  });
  initialised = true;
}
