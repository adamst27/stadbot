"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useState } from "react";

const page = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const res: any | undefined = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full h-screen flex flex-row items-center bg-slate-950 text-white">
      <div className="w-1/2 py-16 px-8 flex flex-col gap-8 h-full justify-center relative">
        <h1 className="text-5xl font-extrabold  text-left">Login</h1>
        <div className="flex flex-col gap-4">
          {inputs.map((input) => (
            <div className="flex flex-col gap-4">
              <Label> {input.placeholder}</Label>
              <Input
                type={input.type}
                placeholder={input.placeholder}
                name={input.name}
              />
            </div>
          ))}
          <p className="text-center text-stone">{error && `Error: ${error}`}</p>
          <Button
            className="bg-primary  h-12 w-full"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
        </div>
        <p className="text-lg text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-violet-500">
            Signup
          </Link>
        </p>
      </div>
      <div
        className="w-1/2 h-full bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url("/images/login.jpg")' }}
      ></div>
    </section>
  );
};

export default page;

const inputs = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];
