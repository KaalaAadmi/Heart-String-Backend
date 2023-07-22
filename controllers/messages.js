import Message from "./../models/Message.js";
import User from "./../models/User.js";

export const uploadMessages = async (req, res) => {
	try {
		const { senderId, recipientId, messageType } = req.body;
		console.log("senderId", senderId);
		console.log("recipientId", recipientId);
		console.log("messageType", messageType);
		const newMessage = new Message({
			senderId,
			recipientId,
			messageType,
			message: messageType === "text" ? req.body.messageText : "",
			timeStamp: new Date(),
			imageUrl: messageType === "image" ? req.body.imageUrl : "",
		});
		await newMessage.save();
		res.status(200).json({ message: "Message sent successfully", newMessage });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error", error: error });
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
		const messages = await Message.find({
			$or: [
				{ senderId: senderId, recipientId: recipientId },
				{ senderId: recipientId, recipientId: senderId },
			],
		}).populate("senderId", "_id name");
		res.status(200).json(messages);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// endpoint to delete messages
export const deleteMessages = async (req, res) => {
	try {
		const {messages}=req.body
		if(!Array.isArray(messages)||messages.length===0){
			return res.status(400).json({error:"Invalid request"})
		}
		await Message.deleteMany({_id:{$in:messages}})
		res.status(200).json({message:"Messages deleted successfully"})
	} catch (error) {
		console.log(error)
		res.status(500).json({error:"Internal server error"})
	}
}