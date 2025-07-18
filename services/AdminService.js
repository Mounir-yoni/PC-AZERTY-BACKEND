const ApiError = require("../utils/apierror");
const asyncHandler = require("express-async-handler");
const Order = require('../models/Order');
const Product = require('../models/Producte');
const User = require('../models/User');
const APIFeatures = require("../utils/apiFeaturs");








exports.OrderStatistics = asyncHandler(async (req, res, next) => {
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }
    ]);
  
    if (totalOrders === undefined || totalSales === undefined) {
      return next(new ApiError("Failed to fetch order statistics", 500));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        totalOrders,
        totalSales: totalSales[0] ? totalSales[0].totalSales : 0
      }
    });
  });

exports.MonthlyStatistics = asyncHandler(async (req, res, next) => {
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  // Orders for this month
  const ordersThisMonth = await Order.find({
    orderDate: { $gte: startOfThisMonth, $lte: now }
  });
  // Only include orders with paymentStatus 'paid' for revenue
  const revenueThisMonth = ordersThisMonth
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + (o.totalValue || 0), 0);
  const acceptedThisMonth = ordersThisMonth.filter(o => o.status === 'shipped').length;
  const deliveredThisMonth = ordersThisMonth.filter(o => o.status === 'delivered').length;

  // Orders for previous month
  const ordersPrevMonth = await Order.find({
    orderDate: { $gte: startOfPrevMonth, $lte: endOfPrevMonth }
  });
  // Only include orders with paymentStatus 'paid' for revenue
  const revenuePrevMonth = ordersPrevMonth
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + (o.totalValue || 0), 0);
  const acceptedPrevMonth = ordersPrevMonth.filter(o => o.status === 'shipped').length;
  const deliveredPrevMonth = ordersPrevMonth.filter(o => o.status === 'delivered').length;

  // Products for this month and previous month
  const productsThisMonth = await Product.countDocuments({ createdAt: { $gte: startOfThisMonth, $lte: now },active: true });
  const productsPrevMonth = await Product.countDocuments({ createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },active:true });

  // Users for this month and previous month
  const usersThisMonth = await User.countDocuments({ createdAt: { $gte: startOfThisMonth, $lte: now } });
  const usersPrevMonth = await User.countDocuments({ createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth } });

  // Helper for percent change
  function percentChange(current, prev) {
    if (prev === 0) return current === 0 ? 0 : 100;
    return Math.round(((current - prev) / prev) * 100);
  }

  res.status(200).json({
    status: 'success',
    data: {
      revenue: {
        thisMonth: revenueThisMonth,
        prevMonth: revenuePrevMonth,
        percentChange: percentChange(revenueThisMonth, revenuePrevMonth)
      },
      orders: {
        thisMonth: ordersThisMonth.length,
        prevMonth: ordersPrevMonth.length,
        percentChange: percentChange(ordersThisMonth.length, ordersPrevMonth.length),
        accepted: {
          thisMonth: acceptedThisMonth,
          prevMonth: acceptedPrevMonth,
          percentChange: percentChange(acceptedThisMonth, acceptedPrevMonth)
        },
        delivered: {
          thisMonth: deliveredThisMonth,
          prevMonth: deliveredPrevMonth,
          percentChange: percentChange(deliveredThisMonth, deliveredPrevMonth)
        }
      },
      products: {
        thisMonth: productsThisMonth,
        prevMonth: productsPrevMonth,
        percentChange: percentChange(productsThisMonth, productsPrevMonth)
      },
      users: {
        thisMonth: usersThisMonth,
        prevMonth: usersPrevMonth,
        percentChange: percentChange(usersThisMonth, usersPrevMonth)
      }
    }
  });
});

exports.getLastFourOrders = asyncHandler(async (req, res, next) => {
  const lastOrders = await Order.find().sort({ orderDate: -1 }).limit(4)
  .populate('user', 'name email') 
  .populate('products.product');
  res.status(200).json({
    status: 'success',
    data: lastOrders
  });
});

exports.getOrdersPerDayLast7Days = asyncHandler(async (req, res, next) => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0, 0);

  // Aggregate orders by day
  const ordersPerDay = await Order.aggregate([
    {
      $match: {
        orderDate: { $gte: sevenDaysAgo, $lte: now }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$orderDate" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Fill missing days with 0
  const result = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6 + i);
    const dateString = date.toISOString().slice(0, 10);
    const found = ordersPerDay.find(d => d._id === dateString);
    result.push({ date: dateString, count: found ? found.count : 0 });
  }

  res.status(200).json({
    status: 'success',
    data: result
  });
});


exports.getTopProducts = asyncHandler(async (req, res, next) => {
  // Find top products sorted by 'sold' field in descending order, limit to top 5
  const topProducts = await Product.find({ active: true })
    .sort({ sold: -1 })
    .limit(5);

  res.status(200).json({
    status: 'success',
    data: topProducts
  });
});

exports.getlastgategory = asyncHandler(async (req, res, next) => {
  // Assuming the model is called Category and has a createdAt field
  const Category = require('../models/Category');
  const lastCategories = await Category.find()
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json({
    status: 'success',
    data: lastCategories
  });
});

exports.getLastFiveUsers = asyncHandler(async (req, res, next) => {
  const lastUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('-password'); // Exclude password field for security

  res.status(200).json({
    status: 'success',
    data: lastUsers
  });
});

exports.getOrdersPerDayLast15Days = asyncHandler(async (req, res, next) => {
  const now = new Date();
  const fifteenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14, 0, 0, 0, 0);

  // Aggregate orders by day
  const ordersPerDay = await Order.aggregate([
    {
      $match: {
        orderDate: { $gte: fifteenDaysAgo, $lte: now }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$orderDate" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Fill missing days with 0
  const result = [];
  for (let i = 0; i < 15; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14 + i);
    const dateString = date.toISOString().slice(0, 10);
    const found = ordersPerDay.find(d => d._id === dateString);
    result.push({ date: dateString, count: found ? found.count : 0 });
  }

  res.status(200).json({
    status: 'success',
    data: result
  });
});
