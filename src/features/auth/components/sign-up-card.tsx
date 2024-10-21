"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FormField,
  Form,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { RegisterSchema } from "../schemas";
import { useRegister } from "../api/use-register";


export const SignUpCard = () => {
  const {mutate} = useRegister()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (vals: z.infer<typeof RegisterSchema>) => {
     mutate({
      json:vals
     })
     form.reset()
  };
  return (
    <Card className=" w-full h-full md:w-[487px] border-none shadow-sm">
      <CardHeader className=" flex items-center justify-center text-center p-7">
        <CardTitle className=" text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Be signing up, you agree to our{" "}
          <Link href={"/privacy"}>
            <span className=" text-blue-700">Privacy policy</span>
          </Link>{" "}
          and{" "}
          <Link href={"/terms"}>
            <span className=" text-blue-700">Terms of service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div
        className=" px-7 mb-2
    "
      >
        <DottedSeparator />
      </div>
      <CardContent className=" p-7">
        <Form {...form}>
          <form className=" space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={false}
              size={"lg"}
              className=" w-full font-semibold text-white"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className=" px-7 ">
        <Separator className=" text-gray-400/85" />
      </div>
      <CardContent className=" p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className=" w-full font-semibold"
        >
          <FcGoogle className=" size-5 mr-2 " />
          Login with Google
        </Button>
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className=" w-full font-semibold"
        >
          <FaGithub className=" mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <div className=" px-7">
         <Separator />
      </div>
      <CardContent className=" p-7 flex items-center justify-center">
        <p>
          Already have an account
          <Link href={"/sign-in"}>
            <span className=" text-blue-700 ml-2">Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
