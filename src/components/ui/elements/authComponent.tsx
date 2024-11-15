"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { useMutation } from "@tanstack/react-query";
import customFetch from "@/lib/customFetch";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next-nprogress-bar";

const AuthComponent = () => {
  const [screen, setScreen] = useState<number>(1);
  const [isPassHidden, setIsPassHidden] = useState(true);
  const router = useRouter();

  const formSchema = z
    .object({
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email" }),
      password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(1, { message: "Password cannot be empty" })
        .optional(), // Make password optional initially
    })
    .refine(
      (data) => {
        return screen == 1 || (data?.password?.trim()?.length ?? 0) > 0;
      },
      {
        message: "Password is required",
        path: ["password"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Query to check if user exists or not
  const { mutate: checkEmailExist, isLoading: isCheckEmailExistLoading } =
    useMutation({
      mutationKey: ["is-user-exists"],
      mutationFn: async (values: z.infer<typeof formSchema>) => {
        const response = await customFetch<any>("/user/is-exists", {
          method: "POST",
          body: { email: values.email },
        });

        return response;
      },
      onSuccess: ({ data }) => {
        const { isExist } = data;

        if (isExist) {
          // this is for signin screen
          setScreen(3);
        } else {
          // this is for signup screen
          setScreen(2);
        }
      },
      onError: (error: any) => {
        toast.error(error?.message || "something went wrong");
      },
    });

  const { mutate: signin, isLoading: isSigninLoading } = useMutation({
    mutationKey: ["email-signin"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await customFetch<any>("/auth/signin", {
        method: "POST",
        body: { email: values.email, password: values.password },
      });
    },
    onSuccess: () => {
      router.push("/cars");
    },
    onError: (error: any) => {
      toast.error(error?.message || "something went wrong");
    },
  });

  const { mutate: signup, isLoading: isSignupLoading } = useMutation({
    mutationKey: ["email-signup"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await customFetch<any>("/auth/signup", {
        method: "POST",
        body: { email: values.email, password: values.password },
      });
    },
    onSuccess: () => {
      router.push("/cars");
    },
    onError: (error: any) => {
      toast.error(error?.message || "something went wrong");
    },
  });

  const { mutate: googleAuth, isLoading: isGoogleAuthLoading } = useMutation({
    mutationKey: ["google-auth"],
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, provider);
      if (!credentials) {
        throw new Error("Google auth failed");
      }
      const { user } = credentials;
      return user;
    },
    onSuccess: async (user) => {
      const idToken = await user.getIdToken();
      await customFetch("/auth/google", {
        method: "POST",
        headers: { authorization: `Bearer ${idToken}` },
      });

      router.push("/cars");
    },
    onError: (error: any) => {
      toast.error(error?.message || "something went wrong");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setScreen(1);
          }}
          className="rounded-full px-6"
        >
          Continue
        </Button>
      </DialogTrigger>

      <DialogContent className="p-12">
        <DialogHeader className="space-y-0 text-xl font-medium">
          {screen == 1 && <span>Login or Signup</span>}
          {screen == 2 && <span>Signup</span>}
          {screen == 3 && <span>Signin</span>}
        </DialogHeader>
        <DialogDescription className="flex flex-col flex-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => {
                if (screen == 1) {
                  checkEmailExist(values);
                } else if (screen == 2) {
                  signup(values);
                } else if (screen == 3) {
                  signin(values);
                }
              })}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-pallate-gray-5 text-sm">
                        E-mail
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <Input
                      disabled={screen !== 1}
                      placeholder="e.g. johndoe123@gmail.com"
                      {...field}
                    />
                  </FormItem>
                )}
              />

              {screen !== 1 && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-3 mt-8">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-pallate-gray-5 text-sm">
                          Password
                        </FormLabel>
                        <FormMessage />
                      </div>
                      <div className="size-fit w-full relative">
                        <Input
                          placeholder="e.g. abc#123"
                          {...field}
                          type={isPassHidden ? "password" : "text"}
                        />
                        <Button
                          type="button"
                          className="size-fit bg-transparent shadow-none hover:bg-transparent absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={() => setIsPassHidden((prev) => !prev)}
                        >
                          {isPassHidden ? (
                            <EyeClosed size={24} className="text-primary" />
                          ) : (
                            <Eye size={24} className="text-primary" />
                          )}
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              <Button
                className="w-full mt-6"
                disabled={
                  isCheckEmailExistLoading || isSigninLoading || isSignupLoading
                }
                isLoading={
                  isCheckEmailExistLoading || isSigninLoading || isSignupLoading
                }
              >
                Continue
              </Button>
            </form>
          </Form>

          <div className="flex w-full items-center gap-4 my-6">
            <div className="border border-pallate-gray-3 flex-1" />
            <span className="text-pallate-gray-4">Or</span>
            <div className="border border-pallate-gray-3 flex-1" />
          </div>

          <Button
            onClick={() => googleAuth()}
            isLoading={isGoogleAuthLoading}
            disabled={isGoogleAuthLoading}
            className="w-full flex items-center gap-2 mt-3 bg-black/70 hover:bg-black/65"
          >
            <Image src="/google.svg" height={24} width={24} alt="google" />
            Google
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AuthComponent;
