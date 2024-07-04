import { getChats } from "@/actions";
import Display from "@/components/display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authOptions } from "@/lib/auth";
import runChat from "@/lib/gemini";
import { getServerSession } from "next-auth";
import React from "react";

const pqge = async () => {
  const session = await getServerSession(authOptions);
  const chats = await getChats();
  console.log(session);
  console.log(chats);
  return (
    <section className="min-h-screen bg-neutral-900 backdrop-blur-lg backdrop-filter">
      <div className="grid grid-cols-[450px_1fr]">
        <div className="flex flex-col gap-6 p-20 border-r h-screen border-gray-800 overflow-y-scroll">
          <h1 className="text-4xl font-extrabold text-white">Chats</h1>
          <div className="flex flex-col gap-4">
            {chats &&
              chats?.map((chat: any, index: number) => (
                <p
                  className="rounded-lg bg-gray-800 text-white p-4"
                  key={index}
                >
                  {chat.name}
                </p>
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
