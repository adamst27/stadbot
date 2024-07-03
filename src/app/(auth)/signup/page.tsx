"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/app");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };
  const handleChange = (e: any) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <section className="w-full h-screen flex  flex-row-reverse items-center bg-slate-950 text-white">
      <div className="w-1/2 py-16 px-8 flex flex-col gap-8 h-full justify-center relative">
        <h1 className="text-5xl font-extrabold  text-left">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Label> {input.placeholder}</Label>
                <Input
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  onChange={(e) => handleChange(e)}
                  className="text-slate-600"
                />
              </div>
            ))}
            <Button className="bg-primary  h-12 w-full" type="submit">
              Login
            </Button>
          </form>
        </div>
        <p className="text-lg text-center">
          Already have an acount?{" "}
          <Link href="/login" className="text-violet-500">
            Login
          </Link>
        </p>
      </div>
      <div
        className="w-1/2 h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/signup.jpg")' }}
      ></div>
    </section>
  );
};

export default page;

const inputs = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "name",
    type: "text",
    placeholder: "Username",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];
