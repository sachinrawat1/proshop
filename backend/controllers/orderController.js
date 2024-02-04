import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc   Create Order
// @route   Post /api/order
// @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((el) => ({
        ...el,
        product: el._id,
        _id: undefined,
      })),
      user: req.user_id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = order.save();
    res.status(201).json(createOrder);
  }
});

// @desc  get My Orders
// @route   Get /api/orders/myorders
// @access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("Get my order");
});

// @desc   Get Order By ID
// @route   Get /api/orders/:id
// @access   Private
const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Update Order to Paid
// @route   Get /api/orders/:id/pay
// @access   Private
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update Order To Paid");
});

// @desc  Update Order to Deliver
// @route   Get /api/orders/:id/deliver
// @access   Private
const UpdateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update Order To Delivered");
});

// @desc  Get All Order
// @route   Get /api/orders
// @access   Private/Admin
const GetAllOrder = asyncHandler(async (req, res) => {
  res.send("Get All Order");
});

export {
  addOrderItems,
  getMyOrders,
  GetAllOrder,
  UpdateOrderToDelivered,
  UpdateOrderToPaid,
  getOrderByID,
};
