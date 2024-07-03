import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import runChat from "@/lib/gemini";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const serversession = getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative bg-neutral-900 gap-6">
      <div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
      <h1 className="text-7xl font-extrabold text-white text-center tracking-wide">
        WELCOME TO <span>STADBOT</span>
      </h1>
      <p className="text-xl  text-white text-center tracking-wide">
        A generative AI text generation bot based on the gemini model
      </p>
      {serversession && JSON.stringify(serversession)}
      <Button
        asChild
        className="text-lg  text-white text-center tracking-wide rounded-full"
      >
        <Link href={"/app"} className="z-10 flex justify-between">
          Get Started <ChevronRight />
        </Link>
      </Button>
    </main>
  );
}
