import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
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

  removeById(userId) {
    return this.findByIdAndRemove(userId).exec();
  },

  findByToken(token) {
    return this.findOne({ "local.verifyToken": token }).exec();
  },

  verify(token) {
    return this.findOneAndUpdate(
      { "local.verifyToken": token },
      { "local.isActive": true },
      { "local.verifyToken": null }
    ).exec();
  },

  findUserById(userId) {
    return this.findById(userId).exec();
  },

  findByFacebookUid(uid) {
    return this.findOne({ "facebook.uid": uid }).exec();
  },

  findByGoogleUid(uid) {
    return this.findOne({ "google.uid": uid }).exec();
  },
};

userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.local.password); // return a promise has result is true or false
  },
};

const User = mongoose.model("user", userSchema);
module.exports = User;
