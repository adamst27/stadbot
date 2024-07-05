import { getChatMessages, getChats } from "@/actions";
import Display from "@/components/display";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const pqge = async ({ searchParams }: { searchParams: { chatId: string } }) => {
  const session = await getServerSession(authOptions);
  const chats = await getChats();
  const valuesOfTheChat = await getChatMessages(searchParams.chatId as string);
  console.log(session);
  console.log(chats);
  console.log(valuesOfTheChat);
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-lg backdrop-filter">
      <div className="grid grid-cols-[450px_1fr]">
        <div className="flex flex-col gap-6 p-20 border-r h-screen border-gray-800 overflow-y-scroll">
          <h1 className="text-4xl font-extrabold text-white">Chats</h1>
          <div className="flex flex-col gap-4">
            {chats &&
              chats?.map((chat: any, index: number) => (
                <Link
                  className="rounded-lg bg-gray-800 text-white p-4"
                  key={index}
                  href={`?chatId=${chat._id}`}
                >
                  {chat.name}
                </Link>
              ))}
          </div>
        </div>
        <div className="h-screen bg-neutral-900">
          <Display />
        </div>
      </div>
    </section>
  );
};

export default pqge;
