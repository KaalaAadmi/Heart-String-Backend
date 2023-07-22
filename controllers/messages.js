import Message from "../models/Message";
import User from "../models/User";

export const uploadMessages = async (req, res) => {
	try {
		const { senderId, recipientId, messageType, messageText } = req.body;
		const newMessage = new Message({
			senderId,
			recipientId,
			messageType,
			messageText,
			timeStamp: new Date(),
			imageUrl: messageType === "image" ? req.file.path : "",
		});
		res.status(200).json({ message: "Message sent successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// endpoint to get the userdetails to design the chat room header
export const getUserDetails = async (req, res) => {
	try {
		const { userId } = req.params;
		// fetch the user details from the database
		const recipientId = await User.findById(userId);
		res.json(recipientId);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// endpoint to fetch the messages between two users in the chatroom
export const getMessages = async (req, res) => {
	try {
		const { senderId, recipientId } = req.params;
		const messages = awaitMessage
			.findOne({
				$or: [
					{ senderId: senderId, recipientId: recipientId },
					{ senderId: recipientId, recipientId: senderId },
				],
			})
			.populate("senderId", "_id name");
		res.json(messages);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
