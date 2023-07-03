import mongoose from "mongoose";

const Schema = mongoose.Schema();

const contactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null },
});

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
