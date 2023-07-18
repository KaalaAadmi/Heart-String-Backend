import mongoose from "mongoose";
import validator from "validator";

const ChatRoomSchema = new mongoose.Schema({
	senderId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	inviteCode: {
		type: String,
		required: true,
	},
	chatroomId: {
		type: String,
		required: true,
	},
});

export default mongoose.model("ChatRoom", ChatRoomSchema);
