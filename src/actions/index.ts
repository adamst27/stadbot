"use server";
import { authOptions } from "@/lib/auth";
import runChat from "@/lib/gemini";
import Chat from "@/models/Chat";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";

export async function getChats() {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const chats = await Chat.find({ userId: session?.user?.id });
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
    const session = await getServerSession(authOptions);
    console.log(session);
    await connectToDB();
    const newChat = await Chat.create({
      name: chatName,
      messages: [],
      userId: session?.user?.id,
    });
    return JSON.parse(JSON.stringify(newChat));
  } catch (error) {
    console.error(error);
  }
}

export async function sendInput(chatId: string, input: string) {
  try {
    await connectToDB();
    const selectedChat = await Chat.findOne({ _id: chatId });
    const output = await runChat(input);
    selectedChat?.messages.push({ in: input, out: output });
    await selectedChat?.save();
    return output;
  } catch (error) {
    console.error(error);
  }
}
