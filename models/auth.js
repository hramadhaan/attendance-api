const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);
