"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import {
  SiDiscord,
  SiGithub,
  SiTiktok,
  SiTwitter,
  SiX,
  SiYoutube,
} from "react-icons/si";
import Link from "next/link";

export const RevealBento = () => {
  return (
    <div className="min-h-screen px-4 py-12 text-zinc-50 z-10">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
    </div>
  );
};

const Block = ({ className, ...rest }: any) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Hi, I&apos;m Adam.{" "}
      <span className="text-zinc-400">I built this website using NextJS</span>
    </h1>
    <a
      href="mailto:adamkoora27@gmailcom"
      className="flex items-center gap-1 text-red-300 hover:underline"
    >
      Contact me <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-8 row-span-2 bg-violet-600 md:col-span-3"
    >
      <Link
        href="https://github.com/adamst27"
        target="_blank"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGithub />
      </Link>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 row-span-2 bg-black md:col-span-3"
    >
      <Link
        href="https://twitter.com/vitocorleone2g"
        target="_blank"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiX />
      </Link>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      This is a chatbot based on gemini-1.5 flash.{" "}
      <span className="text-zinc-400">
        I build websites mainly with Next/React and TailwindCSS, give me a star
        in github if you liked this project.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Morocco</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg font-bold">Interested in my work?</p>

    <Link
      type="submit"
      className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      href="mailto:adamkoora27@gmailcom"
    >
      <FiMail /> Mail me now
    </Link>
  </Block>
);
