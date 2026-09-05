import OrderModel from "#models/order.model.js";
import OrderItemModel from "#models/order-item.model.js";
import UserModel from "#models/user.model.js";
import { sequelize } from "#config/db.config.js";

const orderInclude = [
  { model: OrderItemModel, as: "orderItems" },
  { model: UserModel, as: "userRecord", attributes: ["_id", "name", "email"] },
];
const presentOrder = (order) => {
  const data = order.toJSON();
  return {
    ...data,
    user: data.userRecord || data.user,
    orderItems:
      data.orderItems?.map((item) => ({
        ...item,
        product: { _id: item.product },
      })) || [],
  };
};
const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (!orderItems?.length) {
    res.status(400);
    throw new Error("No order items");
  }
  const order = await sequelize.transaction(async (transaction) => {
    const created = await OrderModel.create(
      {
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      },
      { transaction },
    );
    await OrderItemModel.bulkCreate(
      orderItems.map(({ _id, name, qty, image, price }) => ({
        order: created._id,
        product: _id,
        name,
        qty,
        image,
        price,
      })),
      { transaction },
    );
    return created;
  });
  res
    .status(201)
    .json(
      presentOrder(
        await OrderModel.findByPk(order._id, { include: orderInclude }),
      ),
    );
};
const getMyOrders = async (req, res) => {
  const pageSize = Math.min(Math.max(Number(req.query.pageSize) || 10, 1), 50);
  const page = Math.max(Number(req.query.pageNumber) || 1, 1);
  const { rows, count } = await OrderModel.findAndCountAll({
    where: { user: req.user._id },
    include: [{ model: OrderItemModel, as: "orderItems" }],
    order: [["createdAt", "DESC"]],
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });
  res.json({
    orders: rows.map(presentOrder),
    page,
    pages: Math.ceil(count / pageSize),
  });
};
const getOrderById = async (req, res) => {
  const order = await OrderModel.findByPk(req.params.id, {
    include: orderInclude,
  });
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (order.user !== req.user._id && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized to view this order");
  }
  res.json(presentOrder(order));
};
const updateOrderToPaid = async (req, res) => {
  const order = await OrderModel.findByPk(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (order.user !== req.user._id) {
    res.status(403);
    throw new Error("Not authorized to pay for this order");
  }
  await order.update({
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address,
    },
  });
  res.json(order);
};
const updateOrderToDelivered = async (req, res) => {
  const order = await OrderModel.findByPk(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  await order.update({ isDelivered: true, deliveredAt: new Date() });
  res.json(order);
};
const getOrders = async (req, res) => {
  const pageSize = Math.min(Math.max(Number(req.query.pageSize) || 25, 1), 100);
  const page = Math.max(Number(req.query.pageNumber) || 1, 1);
  const { rows, count } = await OrderModel.findAndCountAll({
    include: [
      {
        model: UserModel,
        as: "userRecord",
        attributes: ["_id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });
  res.json({
    orders: rows.map(presentOrder),
    page,
    pages: Math.ceil(count / pageSize),
  });
};
export {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
