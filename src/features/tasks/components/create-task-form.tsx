/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import { z } from "zod";
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
import { useCreateTask } from "../api/use-create-task";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { createTaskSchema } from "../schemas";
import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TASKSTATUS } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string; imageUrl: string }[];
  memberOptions: {
    id: string;
    name: string;
  }[];
}
export const CreateTaskForm = ({
  onCancel,
  projectOptions,
  memberOptions,
}: CreateTaskFormProps) => {
  const { close } = useCreateTaskModal();
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate, isPending } = useCreateTask();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      workspaceId,
    },
  });
  const onSubmit = (vals: z.infer<typeof createTaskSchema>) => {
    mutate(
      {
        json: { ...vals, workspaceId },
      },
      {
        onSuccess({ data }) {
          form.reset();
          onCancel?.(
            
          )
          //   router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className=" w-full h-full border-none shadow-none rounded-md">
      <CardHeader className=" flex p-7">
        <CardTitle className=" text-xl font-bold">Create a new task</CardTitle>
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
                    <FormLabel>Task name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Task name.." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="assigneeId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            <div className=" flex items-center gap-x-2">
                              <MemberAvatar
                                className=" size-6"
                                name={member.name}
                              />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select task status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage/>
                      <SelectContent>
                            <SelectItem value={TASKSTATUS.BACKLOG}>
                                Backlog
                                </SelectItem>   
                            <SelectItem value={TASKSTATUS.IN_PROGRESS}>
                              In progress
                                </SelectItem>   
                            <SelectItem value={TASKSTATUS.IN_REVIEW}>
                               In review
                                </SelectItem>   
                            <SelectItem value={TASKSTATUS.TODO}>
                                Todo
                                </SelectItem>   
                            <SelectItem value={TASKSTATUS.DONE}>
                                Done
                                </SelectItem>   
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="projectId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select a project" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage/>
                      <SelectContent>
                      {projectOptions.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className=" flex items-center gap-x-2">
                              <ProjectAvatar
                                className=" size-6"
                                name={project.name}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
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
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
