import express from "express";
import { sendInvitation, acceptInvitation } from "../controllers/invitation.js";

const router = express.Router();

// Create Invitation
router.post("/create-invitation", sendInvitation);

// Accept Invitation
router.post("/accept-invitation", acceptInvitation);

export default router;