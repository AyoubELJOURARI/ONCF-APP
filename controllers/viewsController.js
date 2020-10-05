const Contract = require('../models/contractModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  //get contracts from collection
  const contracts = await Contract.find();
  //
  res.status(200).render('overview', {
    title: 'All contracts',
    contracts,
  });
});

exports.getContract = catchAsync(async (req, res) => {
  //get contract from id
  const contract = await Contract.findById({ _id: req.params.id });

  //if (!contract) {
  //  return next(new AppError('There is no tour with that id.', 404));
  //}
  res.status(200).render('contract', {
    title: contract.numMarche,
    contract,
  });
});

exports.getWelcome = (req, res) => {
  res.status(200).render('welcome', {
    title: 'STAGE APP',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
