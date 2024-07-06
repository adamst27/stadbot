import { RevealBento } from "@/components/Bento";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import runChat from "@/lib/gemini";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-16 px-6 lg:p-24 relative bg-neutral-900 gap-6 z-10">
      <div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
      <h1 className="md:text-6xl text-2xl lg:text-7xl font-extrabold text-white text-center tracking-wide z-10">
        WELCOME TO <span>STADBOT</span>
      </h1>
      <p className="text-xl  text-white text-center tracking-wide">
        A generative AI text generation bot based on the gemini model
      </p>
      <Button
        asChild
        className="text-sx md:text-sm lg:text-lg  text-white text-center tracking-wide rounded-full"
      >
        <Link href={"/app"} className="z-10 flex justify-between">
          Get Started <ChevronRight />
        </Link>
      </Button>
      <RevealBento />
    </main>
  );
}
