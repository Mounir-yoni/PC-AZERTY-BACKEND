const Homepageslider = require('../models/homepageslider');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apierror');

// Create new slider
exports.createSlider = asyncHandler(async (req, res, next) => {
  let imageUrl = req.body.image;
  if (req.file && req.file.path) {
    imageUrl = req.file.path;
  }
  const slider = await Homepageslider.create({
    title: req.body.title,
    description: req.body.description,
    image: imageUrl,
  });
  res.status(201).json({ status: 'success', data: slider });
});

// Get all sliders
exports.getSliders = asyncHandler(async (req, res, next) => {
  const sliders = await Homepageslider.find().sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', data: sliders });
});

// Get single slider
exports.getSlider = asyncHandler(async (req, res, next) => {
  const slider = await Homepageslider.findById(req.params.id);
  if (!slider) return next(new ApiError('Slider not found', 404));
  res.status(200).json({ status: 'success', data: slider });
});

// Update slider
exports.updateSlider = asyncHandler(async (req, res, next) => {
  let imageUrl = req.body.image;
  if (req.file && req.file.path) {
    imageUrl = req.file.path;
  }
  const slider = await Homepageslider.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      image: imageUrl,
    },
    { new: true, runValidators: true }
  );
  if (!slider) return next(new ApiError('Slider not found', 404));
  res.status(200).json({ status: 'success', data: slider });
});

// Delete slider
exports.deleteSlider = asyncHandler(async (req, res, next) => {
  const slider = await Homepageslider.findByIdAndDelete(req.params.id);
  if (!slider) return next(new ApiError('Slider not found', 404));
  res.status(204).json({ status: 'success', data: null });
}); 