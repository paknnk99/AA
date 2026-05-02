"use server"

import { revalidatePath } from "next/cache";

export default async function DeleteData(id) {
  try {
    await prisma.user.delete({
      where: { id }
    });
    revalidatePath("/readdata");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user");
  }
}