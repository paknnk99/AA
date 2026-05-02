"use server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SignUp({name, email, password, image}) {
  if (!name || !email || !password || !image) {
    return { error: "please fill all the credentials" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password,
      image,
    },
  });
  return { success: "data stored successfully" };
}