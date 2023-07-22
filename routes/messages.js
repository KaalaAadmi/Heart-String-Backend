import express from "express";
import { getMessages, getUserDetails, uploadMessages } from "../controllers/messages";
import multer from "multer";

const router = express.Router();
const upload =multer({storage:storage})
router.post('/messages',upload.single('imageFile'),uploadMessages)

router.get('/user/:id',getUserDetails)
router.get("/:senderId/:recipientId", getMessages);
export default router;