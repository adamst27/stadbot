import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  messages: [
    {
      input: {
        type: String,
      },
      output: {
        type: String,
      },
    },
  ],
});

const Chat = models.Chat || model("Chat", ChatSchema);
export default Chat;
