const express = require("express");
const { protect, allowedTo } = require("../services/AuthService");
const { OrderStatistics, MonthlyStatistics, getLastFourOrders, getOrdersPerDayLast7Days,getTopProducts,getlastgategory, getLastFiveUsers, getOrdersPerDayLast15Days } = require("../services/AdminService");

const router = express.Router();

// Admin statistics endpoint
router.get("/order-statistics", protect, allowedTo("admin", "superadmin", "manager"), OrderStatistics);
router.get("/monthly-statistics", protect, allowedTo("admin", "superadmin", "manager"), MonthlyStatistics);
router.get("/last-orders", protect, allowedTo("admin", "superadmin", "manager"), getLastFourOrders);
router.get("/orders-per-day-last-7-days", protect, allowedTo("admin", "superadmin", "manager"), getOrdersPerDayLast7Days);
router.get("/top-products", protect, allowedTo("admin", "superadmin", "manager"), getTopProducts);
router.get("/last-gategory", protect, allowedTo("admin", "superadmin", "manager"), getlastgategory);
router.get("/last-users", protect, allowedTo("admin", "superadmin", "manager"), getLastFiveUsers);
router.get("/orders-per-day-last-15-days", protect, allowedTo("admin", "superadmin", "manager"), getOrdersPerDayLast15Days);

module.exports = router;
