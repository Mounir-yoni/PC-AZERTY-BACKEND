const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { protect, allowedTo } = require('../services/AuthService');
const {
  newSliderValidator,
  getSliderValidator,
  updateSliderValidator,
  deleteSliderValidator,
} = require('../utils/validators/HomepagesliderValidator');
const {
  createSlider,
  getSliders,
  getSlider,
  updateSlider,
  deleteSlider,
} = require('../services/HomepagesliderService');

router
  .route('/')
  .get(getSliders)
  .post(
    upload.single('image'),
    protect,
    allowedTo('admin', 'superadmin', 'manager'),
    createSlider
  );

router
  .route('/:id')
  .get(getSliderValidator, getSlider)
  .put(
    protect,
    allowedTo('admin', 'superadmin', 'manager'),
    upload.single('image'),
    updateSliderValidator,
    updateSlider
  )
  .delete(
    protect,
    allowedTo('admin', 'superadmin', 'manager'),
    deleteSliderValidator,
    deleteSlider
  );

module.exports = router; 