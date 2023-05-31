// Controller file (userController.js)
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const jwt = require('jsonwebtoken');

const uploadImages = async (images) => {
  const imageUrls = [];

  for (const image of images) {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(image.path));

    const apiKey = '37bc7bc855d5ec377b67f417c86d8033'; // Replace with your ImgBB API key

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        key: apiKey,
      },
    });
    console.log(response.data);

    imageUrls.push(response.data.data.url);
  }

  return imageUrls;
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  const isValidEmail = emailValidator.validate(email);
  if (!isValidEmail) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User is already registered');
  }

  let imageUrls;
  try {
    imageUrls = await uploadImages(req.files);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to upload images');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    photo_1: imageUrls[0],
    photo_2: imageUrls[1],
  });

  await newUser.save();

  if (newUser) {
    res.status(201).json({ _id: newUser._id, email: newUser.email, username, photo_1: imageUrls[0], photo_2: imageUrls[1] });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  const secretKey = 'princejung7'; // Replace with your own secret key for JWT

  const token = jwt.sign({ email: user.email, userId: user._id }, secretKey, { expiresIn: '1h' });

  res.json({ message: 'Login successful', email, token });
});

module.exports = { registerUser, loginUser };
