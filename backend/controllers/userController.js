import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

/**
@desc  register new user
@route  POST  /api/users
@access   Public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

/**
@desc  login user
@route  POST  /api/users/login
@access   Public
*/

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Set JWT as Http-only cookie

    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
@desc  get user profile
@route  get  /api/users/profile
@access   Private
*/

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
@desc  logout user
@route  POST  /api/users/logout
@access   Private
*/

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
});

/**
@desc  update user profile
@route  PUT  /api/users/profile
@access   Private
*/

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Get Users
// @route   GET /api/users
// @access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get Users");
});

// @desc   Get Users by Id
// @route   GET /api/users/:id
// @access   Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
  res.send("get Users By Id");
});

// @desc   Delete Users
// @route   DELETE /api/users/:id
// @access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete Users");
});

// @desc   Update user Profile
// @route   PUT /api/users/:id
// @access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update User");
});

export {
  authUser,
  getUsers,
  getUserProfile,
  getUsersById,
  logoutUser,
  registerUser,
  deleteUser,
  updateUser,
  updateUserProfile,
};
