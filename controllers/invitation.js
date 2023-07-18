import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Invitations from "./../models/Invitations.js";
import ChatRoom from "./../models/Chatroom.js";
dotenv.config();

export const sendInvitation = async (req, res) => {
	try {
		const invitation = await Invitations.findOne({
			senderId: req.body.senderId,
			// inviteCode: req.body.inviteCode,
		});
		if (invitation) {
			return res.status(400).send({
				message: "Invitation already exists",
			});
		}
		const newInvitation = new Invitations({
			senderId: req.body.senderId,
			inviteCode: req.body.inviteCode,
		});
		const savedInvitation = await newInvitation.save();
		return res.status(201).json({
			success: true,
			savedInvitation,
		});
	} catch (error) {
		console.error(JSON.stringify(error));
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const acceptInvitation = async (req, res) => {
	try {
		const validInvite = await Invitations.findOne({
			inviteCode: req.body.inviteCode,
		});
		if (!validInvite) {
			return res.status(400).send({
				message: "Invalid invitation code",
			});
		}
		const chatroom = await ChatRoom.findOne({
			senderId: validInvite.senderId,
			receiverId: req.body.senderId,
		})
		if(chatroom) {
			return res.status(500).send({
				message: "Chatroom already exists",
			});
		}
		const newChatroom = new ChatRoom({
			senderId: validInvite.senderId,
			receiverId: req.body.senderId,
			inviteCode: validInvite.inviteCode,
			chatroomId: validInvite.senderId + "HEARTSTRINGS" + req.body.senderId,
			ids: [validInvite.senderId, req.body.senderId],
		});
		const savedChatroom = await newChatroom.save();
		return res.status(201).json({
			success: true,
			savedChatroom,
		});
	} catch (error) {
		console.error(JSON.stringify(error));
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
