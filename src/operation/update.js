"use server"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"

export default async function GetsingleData(id){
   try{
   const data = await prisma.user.findUnique({
        where:{id}
    })
    return data;
   } catch(error){
     console.error(error);
  return null;
   }
}

export async function UpdataData({id,name,email,password,image}){
  const data = await prisma.user.update({
    where:{id},
    data:{
        name,
        email,
        password,
        image
    }
  })
  redirect("/dasbord")
}