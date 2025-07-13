const Order = require('../models/Order');
const Factory = require("./HandleFactory");

exports.createOrder = Factory.createOne(Order);

exports.getOrders = Factory.getAll(Order, 'Order');

exports.getOrder =  Factory.getOne(Order);

exports.updateOrder = Factory.updateOne(Order);

exports.deleteOrder = Factory.deleteOne(Order);