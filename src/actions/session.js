"use server";

import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = "mykey";

export default async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = Jwt.verify(token.value, SECRET);

    return decoded;
  } catch (error) {
    redirect("/login");
  }
}
