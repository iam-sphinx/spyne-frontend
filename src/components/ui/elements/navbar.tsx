"use client";
import { useUser } from "@/contexts/userContext";
import { User } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { Button } from "../button";
import { handleCookie } from "@/lib/handleCookie";
import { useRouter } from "next-nprogress-bar";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await handleCookie("DEL", "access_token");
    router.push("/");
  };

  return (
    <nav className="h-16 px-2.5 md:px-20 flex w-full items-center justify-between border-b border-secondary z-10 fixed top-0 left-0 bg-white">
      <div className="flex w-full items-center justify-end gap-6">
        <div className="size-12 rounded-full bg-primary/40 relative overflow-hidden flex items-center justify-center">
          {user?.profileImg ? (
            <Image
              src={user.profileImg}
              fill
              alt="user"
              className="size-full object-cover"
            />
          ) : (
            <User size={16} className="text-white" />
          )}
        </div>

        <Button variant={"destructive"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
