"use client";

import { useState } from "react";
import Link from "next/link";
import Signout from "./Signout";

const SidebarContent = ({ chats }: { chats: any[] }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition duration-200 max-h-screen ease-in-out z-10 w-[100%] lg:w-[450px] bg-gray-900 overflow-y-auto`}
      >
        <div className="flex flex-col gap-6 p-6 lg:p-20 border-r h-full border-gray-800 py-20">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
            Chats
          </h1>
          <div className="flex flex-col justify-between gap-4 flex-grow py-4">
            <div className="flex flex-col gap-4">
              {chats &&
                chats?.map((chat: any, index: number) => (
                  <Link
                    className="rounded-lg bg-gray-800 text-white p-4 hover:bg-gray-700 transition duration-150"
                    key={index}
                    href={`?chatId=${chat._id}`}
                  >
                    {chat.name}
                  </Link>
                ))}
            </div>
            <Signout />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarContent;
