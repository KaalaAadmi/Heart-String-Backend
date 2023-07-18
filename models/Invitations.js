import mongoose from "mongoose";
import validator from "validator";

const InvitationsSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  inviteCode:{
    type: String,
    required: true,
  }
});
export default mongoose.model("Invitations", InvitationsSchema);
