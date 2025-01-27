"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(data);
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
      } else {
        window.location.href = "/app";
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(data);
  });
  return (
    <section className="w-full h-screen flex flex-row items-center bg-slate-950 text-white">
      <div className="w-full lg:w-1/2 py-16 px-8 flex flex-col gap-8 h-full justify-center relative">
        <h1 className="text-5xl font-extrabold  text-left">Login</h1>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {inputs.map((input, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Label> {input.placeholder}</Label>
                <Input
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  className="text-black"
                  onChange={(e) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        [e.target.name]: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            ))}
            <p className="text-center text-stone">
              {error && `Error: ${error}`}
            </p>
            <Button className="bg-primary  h-12 w-full">Login</Button>
          </form>
        </div>
        <p className="text-lg text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-violet-500">
            Signup
          </Link>
        </p>
      </div>
      <div
        className="w-0 lg:w-1/2 h-full bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url("/images/login.jpg")' }}
      ></div>
    </section>
  );
};

export default Page;

const inputs = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];
