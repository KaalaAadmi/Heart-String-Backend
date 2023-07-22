import Message from "./../models/Message.js";
import User from "./../models/User.js";

export const uploadMessages = async (req, res) => {
	try {
		const { senderId, recipientId, messageType, messageText } = req.body;
		const newMessage = new Message({
			senderId,
			recipientId,
			messageType,
			message:messageText,
			timeStamp: new Date(),
			imageUrl: messageType === "image" ? req.file.path : "",
		});
		await newMessage.save();
		res.status(200).json({ message: "Message sent successfully", newMessage });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// endpoint to get the user details to design the chat room header
export const getUserDetails = async (req, res) => {
	try {
		const { id } = req.params;
		// fetch the user details from the database
		const recipient = await User.findById(id);
		res.status(200).send({ recipient: recipient });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// endpoint to fetch the messages between two users in the chatroom
export const getMessages = async (req, res) => {
	try {
		const { senderId, recipientId } = req.params;
		const messages = await Message
			.findOne({
				$or: [
					{ senderId: senderId, recipientId: recipientId },
					{ senderId: recipientId, recipientId: senderId },
				],
			})
			.populate("senderId", "_id name");
		res.status(200).json(messages);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
