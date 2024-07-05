"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signout = () => {
  const router = useRouter();
  return (
    <Button
      variant="destructive"
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Sign out
    </Button>
  );
};

export default Signout;
