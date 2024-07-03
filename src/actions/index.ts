import runChat from "@/lib/gemini";
import Chat from "@/models/Chat";
import { connectToDB } from "@/utils/database";

export async function getChats() {
  try {
    await connectToDB();
    const chats = await Chat.find({});
    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    console.error(error);
  }
}

export async function getChatMessages(chatId: string) {
  try {
    await connectToDB();
    const selectedChat = await Chat.findOne({ _id: chatId });
    const chatMessages = selectedChat?.messages;

    if (chatMessages) {
      return JSON.parse(JSON.stringify(chatMessages));
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}

export async function startChat(chatName: string) {
  try {
    await connectToDB();
    const newChat = await Chat.create({ name: chatName, messages: [] });
    return newChat;
  } catch (error) {
    console.error(error);
  }
}

export async function sendInput(chatId: string, input: string) {
  try {
    await connectToDB();
    const selectedChat = await Chat.findOne({ _id: chatId });
    const output = await runChat(input);
    selectedChat?.messages.push({ input, output });
    await selectedChat?.save();
    return output;
  } catch (error) {
    console.error(error);
  }
}
