import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./../models/User.js";
dotenv.config();

export const register = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).send({
        message: "Account with this email already exists. Please login!",
      });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
      gender:req.body.gender,
      image:req.body.image
    });
    console.log(req.body);
    const savedUser = await newUser.save();
    return res.status(201).json({
      success: true,
      savedUser,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).select("+password");
    if (!user) {
      return res.status(401).json("Something went wrong!");
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      console.log(user);
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.password) {
        return res.status(401).json("Something went wrong!");
      } else {
        const accessToken = jwt.sign(
          {
            ...user,
          },
          process.env.JWT_SEC,
          {
            expiresIn: process.env.JWT_EXPIRES_IN*24*60*60,
          }
        );
        const { password, ...others } = user._doc;
        return res.status(200).json({
          ...others,
          accessToken,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error occurred.",
    });
  }
};

