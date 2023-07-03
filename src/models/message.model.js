import mongoose from "mongoose";

const Schema = mongoose.Schema();

const messageSchema = new Schema({
  sender: {
    id: String,
    userName: String,
    avatar: String,
  },
  receiver: {
    id: String,
    userName: String,
    avatar: String,
  },
  text: String,
  file: { data: Buffer, contentType: String, fileName: String },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null },
});

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
