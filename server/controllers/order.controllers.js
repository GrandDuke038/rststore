import OrderModel from "#models/order.model.js";

/**
 * @desc		Create new order
 * @route		POST /api/v1/orders
 * @access	Private
 */
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

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new OrderModel({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: { ...item },
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
};

/**

@@ -15,7 +46,8 @@ const createOrder = async (req, res) => {
 * @access	Private
 */
const getMyOrders = async (req, res) => {
  const orders = await OrderModel.find({ user: req.user._id });
};

/**

@@ -24,7 +56,16 @@ const getMyOrders = async (req, res) => {
 * @access	Private
 */
const getOrderById = async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

/**
 * @desc		Update order to paid
 * @route		PUT /api/v1/orders/:id/pay
 * @access	Private
 */
const updateOrderToPaid = async (req, res) => {
  const order = await OrderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

/**
 * @desc		Update order to delivered
 * @route		PUT /api/v1/orders/:id/deliver
 * @access	Private/Admin
 */
const updateOrderToDelivered = async (req, res) => {
  res.send("Update order to delivered");
};

/**
 * @desc		Get all orders
 * @route		GET /api/v1/orders
 * @access	Private/Admin
 */
const getOrders = async (req, res) => {
  const orders = await OrderModel.find({}).populate("user", "name email");
  res.status(200).json(orders);
};

export {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
