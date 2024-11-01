"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import { z } from "zod";
import { updateProjectSchema } from "../schemas";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Project } from "../types";

import { useConfirm } from "@/hooks/use-confirm";

import { useUpdateProject } from "../api/use-update-project";
import { useDeleteProject } from "../api/use-delete-project";

interface EditProjectFormProps {
  onCancel?: () => void;
  initialValues: Project;
}
export const EditProjectForm = ({
  onCancel,
  initialValues,
}: EditProjectFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateProject();
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete this project",
    "This action cannot be undone",
    "destructive"
  );

  const { mutate: deleteProject, isPending: isDeletingProject } =
    useDeleteProject();

  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });
  const onSubmit = (vals: z.infer<typeof updateProjectSchema>) => {
    const finalValues = {
      ...vals,
      image: vals.image instanceof File ? vals.image : "",
    };
    mutate(
      {
        form: finalValues,
        param: { projectId: initialValues.$id },
      },
      {
        onSuccess() {
          form.reset();
        },
      }
    );
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteProject(
      {
        param: { 
          projectId: initialValues.$id
         },
      },
      {
        onSuccess: () => {
          window.location.href=`/workspaces/${initialValues.workspaceId}`
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
    <div className=" flex flex-col gap-y-4">
      <DeleteDialog />

      <Card className=" w-full h-full border-none shadow-none rounded-md">
        <CardHeader className=" flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size={"sm"}
            variant={"secondary"}
            onClick={
              onCancel
                ? onCancel
                : () =>
                    router.push(
                      `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`
                    )
            }
          >
            Back
            <ArrowLeft className=" size-4 mr-2" />
          </Button>
          <CardTitle className=" text-xl font-bold">
            {initialValues.name}
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
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Project name.." />
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
                          <p className=" text-sm">Project Icon</p>
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
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant={"destructive"}
                              size={"xs"}
                              className=" w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current)
                                  inputRef.current.value = "";
                              }}
                            >
                              Remove image
                            </Button>
                          ) : (
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
                          )}
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
                  className={`${!onCancel && "invisible"}`}
                >
                  Cancel
                </Button>
                <Button type="submit" size={"lg"} disabled={isPending}>
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className=" w-full h-full border-none shadow-none">
        <CardContent className=" p-7">
          <div className=" flex flex-col">
            <h3 className=" font-bold">Danger zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a project is irreversible and will remove all associated
              data .
            </p>
            <Button
              className=" mt-6 w-fit ml-auto"
              size={"sm"}
              variant={"destructive"}
              type="button"
              disabled={isDeletingProject || isPending}
              onClick={handleDelete}
            >
              Delete project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
