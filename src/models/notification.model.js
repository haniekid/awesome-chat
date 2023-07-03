import mongoose from "mongoose";

const Schema = mongoose.Schema();

const notificationchema = new Schema({
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
  type: String,
  content: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now() },
});

const Notification = mongoose.model("notification", notificationchema);
module.exports = Notification;
