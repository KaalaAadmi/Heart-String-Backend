import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ChatRoom from "./../models/Chatroom.js";
dotenv.config();

export const getChatRoom = async (req, res) => {
	const { id } = req.body;

  try {
    const result = await ChatRoom.findOne({ ids: { $in: id } }).exec();

    if (result) {
      // ID found, return the result
      res.status(200).json(result);
    } else {
      // ID not found
      res.status(404).json({ message: 'ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createChatRoom = async (req, res) => {
	try {
		const chatRoom = await ChatRoom.findOne({
			senderId: req.body.senderId,
		});
		if (chatRoom) {
			return res.status(400).send({
				message: "Chatroom already exists",
			});
		}
		const newChatRoom = new ChatRoom({
			senderId: req.body.senderId,
			receiverId: req.body.receiverId,
			inviteCode: req.body.inviteCode,
		});
		console.log(req.body);
		const savedChatRoom = await newChatRoom.save();
		return res.status(201).json({
			success: true,
			savedChatRoom,
		});
	} catch (error) {
		console.error(JSON.stringify(error));
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
