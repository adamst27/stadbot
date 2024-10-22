"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getChatMessages, sendInput, startChat } from "@/actions";
import { useSearchParams, useRouter } from "next/navigation";

const Display = ({ values }: { values: any }) => {
  const [messages, setMessages] = useState<Array<{ in: string; out: string }>>(
    []
  );
  const [prompt, setPrompt] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const chatId = params.get("chatId");

  useEffect(() => {
    if (chatId && values.length > 0) {
      setMessages(values);
    } else {
      setMessages([]);
    }
  }, [chatId, values]);

  const handleClick = async () => {
    if (chatId) {
      const output = await sendInput(chatId, prompt, messages);
      setMessages((prev) => [...prev, { in: prompt, out: output as string }]);
    } else {
      const newChat = await startChat(prompt);
      const output = await sendInput(newChat._id, prompt, messages);
      setMessages([{ in: prompt, out: output as string }]);
      router.push(`?chatId=${newChat._id}`);
    }
    setPrompt("");
  };

  const formatOutput = (output: string) => {
    const parts = output.split("```");
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return part.split("\n").map((paragraph, pIndex) => (
          <p key={pIndex} className="mb-2">
            {paragraph}
          </p>
        ));
      } else {
        return (
          <pre
            key={index}
            className="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto"
          >
            <code className="text-sm text-green-400">{part}</code>
          </pre>
        );
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pt-20">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-[70%]">
                {message.in}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white rounded-lg py-2 px-4 max-w-[70%]">
                {formatOutput(message.out)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-800">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            onClick={handleClick}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Display;
