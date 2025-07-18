const express = require('express');
const { createOrderValidator } = require('../utils/validators/OrderValidator');
const OrderService = require('../services/OrderService');
const router = express.Router();
const { createOrder, getOrder, getOrders, deleteOrder, updateOrder,getOrdersByUser } = require('../services/OrderService');
const {protect,allowedTo} = require('../services/AuthService');
router
  .route('/')
  .get(protect,allowedTo("admin","superadmin","manager"),getOrders)
  .post(protect, createOrder);
router.get('/user-orders', protect, getOrdersByUser); // Endpoint to get orders by user
router
  .route('/:id')
  .get(getOrder)
  .put(createOrderValidator,protect,allowedTo("admin","superadmin","manager"), updateOrder)
  .delete(protect,allowedTo("admin","superadmin","manager"),deleteOrder);

module.exports = router; 