"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}
export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
    const {mutate,isPending} = useCreateWorkspace()
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (vals: z.infer<typeof createWorkspaceSchema>) => {
   mutate({
    json:vals
   })
  };
  return (
    <Card className=" w-full h-full border-none shadow-none">
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
            render={({field})=>(

                <FormItem>
                     <FormLabel>
                        Workspace Name
                     </FormLabel>
                     <FormControl>
                        <Input
                        {...field}
                        placeholder="Enter workspace name.."
                        />
                     </FormControl>
                     <FormMessage />
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
              >
                Cancel
              </Button>
              <Button
              type="submit"
              size={"lg"}
              disabled={isPending}
              >
            Create workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
