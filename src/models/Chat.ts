import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  messages: [
    {
      in: {
        type: String,
      },
      out: {
        type: String,
      },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Chat = models.Chat || model("Chat", ChatSchema);
export default Chat;
