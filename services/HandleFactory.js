/* eslint-disable no-unused-vars */
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apierror");
const APIFeatures = require("../utils/apiFeaturs");

const deleteOne = (model) => 
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError("document not found", 404));
    }
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

const createOne = (model) => asyncHandler(async (req, res) => {
  if (req.user) {
    req.body.user = req.user._id;
  }
  const document = await model.create(req.body);
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
  if (req.params.CategoryId) filterob = { category: req.params.CategoryId };
  const countDocument = await model.countDocuments();
  const document = new APIFeatures(model.find(filterob), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination(countDocument)
    .serching(modelname);

  const { paginationResult, Mongoosequery } = document;
  const documents = await Mongoosequery;
  res
    .status(200)
    .json({ result: documents.length, paginationResult, data: documents });
});

module.exports = { deleteOne, updateOne, createOne ,getOne ,getAll}; 
