const asyncHandler = require("express-async-handler");
const Order = require('../models/Order');
const Factory = require("./HandleFactory");
const ApiError = require("../utils/apierror");

exports.createOrder = Factory.createOne(Order);

exports.getOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find().sort({ orderDate: -1 })
    .populate('user', 'name email phone ') 
    .populate('products.product');
    res.status(200).json({
      status: 'success',
      data: orders
    });
  });
exports.getOrder =  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id)
    .populate('user', 'name email phone address') 
    .populate('products.product');
    res.status(200).json({
      status: 'success',
      data: order
    });
  });

exports.updateOrder = Factory.updateOne(Order);

exports.deleteOrder = Factory.deleteOne(Order);

exports.getOrdersByUser = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).sort({ orderDate: -1 })
    .populate('user', 'name email phone ') 
    .populate('products.product');
    
    res.status(200).json({
      status: 'success',
      data: orders
    });
  });