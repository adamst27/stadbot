import { getChatMessages, getChats } from "@/actions";
import Signout from "@/components/Signout";
import Display from "@/components/display";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const pqge = async ({ searchParams }: { searchParams: { chatId: string } }) => {
  const chats = await getChats();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const valuesOfTheChat = await getChatMessages(searchParams.chatId as string);
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-lg backdrop-filter">
      <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr]">
        <div className="hidden lg:flex flex-col gap-6 p-20 border-r h-screen border-gray-800 overflow-y-scroll">
          <h1 className="text-4xl font-extrabold text-white">Chats</h1>
          <div className="flex flex-col justify-between gap-4">
            <div className="flex flex-col  gap-4">
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
            <Signout />
          </div>
        </div>
        <div className="h-screen bg-neutral-900">
          <Display values={valuesOfTheChat} />
        </div>
      </div>
    </section>
  );
};

export default pqge;
