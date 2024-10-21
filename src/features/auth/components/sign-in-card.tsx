"use client";
import React from "react";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,

  FormItem,
  FormMessage,

} from "@/components/ui/form";
import Link from "next/link";
const formSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1,{
    message:"Required"
  }),
});
export const SignInCard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (vals:z.infer<typeof formSchema>)=>{
       console.log(vals)
  }
  return (
    <Card className=" w-full h-full md:w-[487px] border-none shadow-sm">
      <CardHeader className=" flex items-center justify-center text-center p-7">
        <CardTitle className=" text-2xl">Hello there welcome back</CardTitle>
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
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email adress"
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
              type="submit"
              className=" w-full font-semibold text-white"
            >
              Login
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
          Dont have an account
          <Link href={"/sign-up"}>
            <span className=" text-blue-700 ml-2">Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
