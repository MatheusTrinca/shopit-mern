const User = require('../models/userModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/sendToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/person.jpg',
      url: 'https://res.cloudinary.com/dbnu7vldy/image/upload/v1637456491/avatars/person.jpg',
    },
  });

  sendToken(user, 201, res);
});

// Login a user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  sendToken(user, 200, res);
});

// Logout user => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
});

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBefore: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Seu Token para recuperação de senha:\n\n${resetUrl}\n\n
Se você não solicitou este email, por favor ignore-o.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'ShopIt Recuperação de Senha',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is invalid or has been expired',
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Passwords does not match', 400));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
