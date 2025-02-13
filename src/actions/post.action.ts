"use server"

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action"
import { revalidatePath } from "next/cache";

export const createPost = async (content : string, image :string) => {
    try {
        const userId = await getDbUserId();

        const post = await prisma.post.create({
            data : {
                content,
                image,
                authorId : userId,
            }
        })

        revalidatePath("/") // purge the cache for homePage

        return { success : true, post }
    } catch (error) {
        console.error(error)
        return { success : false, error : "Fail to create post."}
    }
}