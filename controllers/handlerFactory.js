const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apifeatures");

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(204).json({
      status: "success",
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newdoc = await Model.create(req.body);
    res.status(201).json({
      message: "success",
      data: {
        data: newdoc
      }
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.params);

    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(200).json({
      message: "success",
      data: {
        doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    //EXECUTE QUERY
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
