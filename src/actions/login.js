"use server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function LoginAcc({ email, password }) {
  if (!email || !password) {
    return { error: "Please fill all credentials" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }

  if (user.password !== password) {
    return { error: "Wrong password" };
  }

  const SECRET = "mykey";
  const token = Jwt.sign({ id: user.id, email: user.email }, SECRET);

  cookies().set("auth", token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  redirect("/dasbord");
}
