import { getChatMessages, getChats } from "@/actions";
import Display from "@/components/display";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SidebarContent from "@/components/SidebarContent";

const Page = async ({ searchParams }: { searchParams: { chatId: string } }) => {
  const chats = await getChats();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const valuesOfTheChat = await getChatMessages(searchParams.chatId as string);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-lg backdrop-filter">
      <div className="grid lg:grid-cols-[450px_1fr]">
        <SidebarContent chats={chats} />
        <div className="h-screen bg-neutral-900">
          <Display values={valuesOfTheChat} />
        </div>
      </div>
    </section>
  );
};

export default Page;
