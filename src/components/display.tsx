"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getChatMessages, sendInput, startChat } from "@/actions";
import { useSearchParams, useRouter } from "next/navigation";

const Display = () => {
  const [isNewChat, setIsNewChat] = useState(true);
  const [messages, setMessages] = useState<Array<{ in: string; out: string }>>(
    []
  );
  const [prompt, setPrompt] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const chatId = params.get("chatId");

  const handleClick = async () => {
    if (chatId) {
      const output = await sendInput(chatId, prompt);
      setMessages((prev) => [...prev, { in: prompt, out: output as string }]);
    } else {
      const newChat = await startChat(prompt);
      const output = await sendInput(newChat._id, prompt);
      setMessages((prev) => [...prev, { in: prompt, out: output as string }]);
      // Update URL with new chatId
      router.push(`?chatId=${newChat._id}`);
      setIsNewChat(false);
    }
    setPrompt("");
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="grid grid-rows-[1fr_50px] p-6 h-screen">
      <div>
        <p className="text-white">
          {messages.map((message, index) => (
            <p key={index}>
              <span>Input: {message.in}</span>
              <span>Output: {message.out}</span>
            </p>
          ))}
        </p>
      </div>
      <div className="flex items-center">
        <Input
          placeholder="Type your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button className="px-8 py-2 text-md" onClick={handleClick}>
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Display;
