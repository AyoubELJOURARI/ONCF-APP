const Contract = require("../models/contractModel");
const APIFeatures = require("../utils/apifeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.aliasTopContracts = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summray,difficulty";
  next();
};

exports.getAllcontracts = factory.getAll(Contract);

exports.getcontract = factory.getOne(Contract);
exports.createcontract = factory.createOne(Contract);
exports.updatecontract = factory.updateOne(Contract);
exports.deletecontract = factory.deleteOne(Contract);
