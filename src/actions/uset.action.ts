"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export const syncUser = async () => {
    try {
        const { userId } = await auth()
        const user = await currentUser()

        if(!userId || !user) return;

        // check if user exists
        const exitUser = await prisma.user.findUnique({
            where : {
                clerkId : userId
            }
        })

        if(exitUser) return exitUser;
        const dbUser = await prisma.user.create({
            data: {
              clerkId: userId,
              name: `${user.firstName || ""} ${user.lastName || ""}`,
              username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
              email: user.emailAddresses[0].emailAddress,
              image: user.imageUrl,
            },
        });

        return dbUser;
        
    } catch (error) {
        console.log("Error in syncUser", error);
    }
}

export const getUserByClerkId = async(clerkId : string) => {
    return prisma.user.findUnique({
        where : {
            clerkId
        },
        include: {
            _count : {
                select : {
                    followers : true,
                    following : true,
                    posts : true
                }
            }
        }
    })
}