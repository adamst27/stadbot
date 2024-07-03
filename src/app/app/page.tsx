import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authOptions } from "@/lib/auth";
import runChat from "@/lib/gemini";
import { getServerSession } from "next-auth";
import React from "react";

const pqge = async () => {
  const session = await getServerSession(authOptions);
  const chats = undefined;
  console.log(session);
  return (
    <section className="min-h-screen bg-neutral-900 backdrop-blur-lg backdrop-filter">
      <div className="grid grid-cols-[450px_1fr]">
        <div className="flex flex-col gap-6 p-20 border-r border-gray-800">
          <h1 className="text-4xl font-extrabold text-white">Chats</h1>
          <div className="flex flex-col gap-4">
            {chats &&
              chats?.map((chat: any, index: number) => (
                <p key={index}>{chat.name}</p>
              ))}
          </div>
        </div>
        <div className="h-screen bg-neutral-900">
          <div className="grid grid-rows-[1fr_50px] p-6 h-screen">
            <div>
              <p>chats</p>
            </div>
            <div className="flex items-center">
              <Input placeholder="Type your prompt" />
              <Button className="px-8 py-2 text-md">Generate</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default pqge;
