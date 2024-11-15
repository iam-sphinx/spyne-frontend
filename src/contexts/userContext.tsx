"use client";
import customFetch from "@/lib/customFetch";
import { handleCookie } from "@/lib/handleCookie";
import { useRouter } from "next-nprogress-bar";
import { cookies } from "next/headers";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  username?: string;
  profileImg?: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  fetchUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await customFetch<any>("/user/info");

      const data = response?.data;
      if (!data) {
        throw new Error("auth failed");
      }

      const userInfo: User = {
        email: data?.email,
        profileImg: data?.profileImg,
        username: data?.username,
      };

      setUser(userInfo);
    } catch (error) {
      await handleCookie("DEL", "access_token");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
