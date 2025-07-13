const express = require('express');
const { createOrderValidator } = require('../utils/validators/OrderValidator');
const OrderService = require('../services/OrderService');
const router = express.Router();
const { createOrder, getOrder, getOrders, deleteOrder, updateOrder } = require('../services/OrderService');

router
  .route('/')
  .get(getOrders)
  .post(createOrderValidator, createOrder);

router
  .route('/:id')
  .get(getOrder)
  .put(createOrderValidator, updateOrder)
  .delete(deleteOrder);

module.exports = router; 