import express from "express";
import {
	deleteMessages,
	getMessages,
	getUserDetails,
	uploadMessages,
} from "../controllers/messages.js";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

const router = express.Router();
// const __dirname = path.resolve();
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		fs.mkdir("./uploads/", (err) => {
// 			cb(null, path.resolve(__dirname, "./uploads/"));
// 		});
// 	},
// 	filename: function (req, file, cb) {
// 		// Generate a unique filename for the upload file
// 		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// 		cb(null, uniqueSuffix + "-" + file.originalname);
// 	},
// });

// const upload = multer({ storage: storage });

router.post("/messages", uploadMessages);

router.get("/user/:id", getUserDetails);
router.get("/:senderId/:recipientId", getMessages);
router.post('/delete-messages',deleteMessages)
export default router;
