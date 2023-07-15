import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  gender: { type: String, enum: ["male", "female"], default: "male" },
  phone: { type: Number, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: "avatar-default.jpg" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  local: {
    email: { type: String, trim: true },
    isActive: { type: Boolean, default: false },
    password: String,
    verifyToken: String,
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true },
  },
  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true },
  },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null },
});

userSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  findByEmail(email) {
    return this.findOne({ "local.email": email }).exec();
  },
};

const User = mongoose.model("user", userSchema);
module.exports = User;
