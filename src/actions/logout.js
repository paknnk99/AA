"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DeleteToken() {
  cookies().delete("auth");
  revalidatePath("/login");
}
 