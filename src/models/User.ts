import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    required: [true, "Username is required"],
    match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
    ],
  },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
