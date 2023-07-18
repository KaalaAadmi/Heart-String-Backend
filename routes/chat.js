import express from "express";
import { createChatRoom, getChatRoom } from "../controllers/chatrooms.js";

const router = express.Router();

// Get Chat Room
router.post("/get-chatroom", getChatRoom);

// Create Chat Room
router.post("/create-chatroom", createChatRoom);

export default router;