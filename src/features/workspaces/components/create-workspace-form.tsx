"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import { z } from "zod";
import { createWorkspaceSchema } from "../schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}
export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (vals: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = {
      ...vals,
      image: vals.image instanceof File ? vals.image : "",
    };
    mutate(
      {
        form: finalValues,
      },
      {
        onSuccess() {
          form.reset();
        },
        onError() {
          toast.error("Could not create workspace");
        },
      }
    );
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };
  return (
    <Card className=" w-full h-full border-none shadow-none rounded-md">
      <CardHeader className=" flex p-7">
        <CardTitle className=" text-xl font-bold">
          Create new workspace
        </CardTitle>
      </CardHeader>
      <div className=" px-7">
        <Separator />
      </div>
      <CardContent className=" p-7">
        <Form {...form}>
          <form
            action="
                "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className=" flex flex-col gap-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter workspace name.." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <div className=" fle flex-col gap-y-2">
                    <div className=" flex items-center gap-x-5">
                      {field.value ? (
                        <div className=" size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="Logo"
                            fill
                            className=" object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className=" size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className=" size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className=" flex flex-col">
                        <p className=" text-sm">Workspace Icon</p>
                        <p className=" text-muted-foreground text-sm">
                          JPG,PNG,SVG or JPEG, max 1mb
                        </p>
                        <input
                          className=" hidden"
                          type="file"
                          accept=".jpg, .png, .jpeg, .svg"
                          ref={inputRef}
                          onChange={handleImageChange}
                          disabled={isPending}
                        />
                        <Button
                          type="button"
                          disabled={isPending}
                          variant={"teritary"}
                          size={"xs"}
                          className=" w-fit mt-2"
                          onClick={() => inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <Separator className=" my-7" />
            <div className=" flex justify-between items-center">
              <Button
                type="button"
                size={"lg"}
                variant={"secondary"}
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size={"lg"} disabled={isPending}>
                Create workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};