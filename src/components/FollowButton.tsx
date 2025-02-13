"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";

const FollowButton = ({userId} : {userId : string}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFollow = async () => {
        setIsLoading(true);
        try {
            await toggleFollow(userId);
            toast.success("User followed successfully")
        } catch (error) {
            toast.error("Error in following user")
        }finally {
            setIsLoading(false);
        }
    }
    return (
        <Button
            size={"sm"}
            className="w-20"
            onClick={handleFollow}
            disabled={isLoading}
            variant={"secondary"}
        >
            { isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow" }
        </Button>
    )
}

export default FollowButton
