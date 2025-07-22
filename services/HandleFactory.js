/* eslint-disable no-unused-vars */
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apierror");
const APIFeatures = require("../utils/apiFeaturs");
const Order = require("../models/Order");
const Product = require("../models/Producte");


const deleteOne = (model) => 
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (!document) {
      return next(new ApiError("document not found", 404));
    }
    document.active = false;
    await document.save();
    res.status(200).json({ data: document });
  });
;

const updateOne = (model) =>asyncHandler(async (req, res, next) => {
  const document = await model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!document) {
    return next(new ApiError("document not found", 404));
  }
  res.status(200).json({ data: document });
});

const createOne = (model) => asyncHandler(async (req, res, next) => {
  console.log(req.body);
  if (req.user) {
    req.body.user = req.user._id;
  }
  const document = await model.create(req.body);

  if (!document) {
    return next(new ApiError("Failed to create document", 400));
  }

  // If creating an Order, update the 'sold' value and decrease the 'quantity' for each product in the order
  if (model === Order && document.products && Array.isArray(document.products)) {
    for (const item of document.products) {
      if (item.product && item.quantity) {
        await Product.findByIdAndUpdate(
          item.product,
          { 
            $inc: { 
              sold: item.quantity,
              quantity: -item.quantity
            } 
          },
          { new: true }
        );
      }
    }
  }

  res.status(201).json({ data: document });
});

const getOne = (model) => asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await model.findById(id);
  if (!document) {
    return next(new ApiError("document not found", 404));
  }
  res.status(200).json({ data: document });
});

const getAll = (model, modelname="") => asyncHandler(async (req, res) => {

  let filterob = {};
  if(model!== Order){
      filterob = { active: true };
    
  }
  if (req.params.CategoryId) filterob = { category: req.params.CategoryId };
  const document = new APIFeatures(model.find(filterob), req.query)
    .filter()
    .sort()
    .limitFields()
    .serching(modelname);

  const { paginationResult, Mongoosequery } = document;
  const documents = await Mongoosequery;
  res
    .status(200)
    .json({ result: documents.length, paginationResult, data: documents });
});

module.exports = { deleteOne, updateOne, createOne ,getOne ,getAll}; 
