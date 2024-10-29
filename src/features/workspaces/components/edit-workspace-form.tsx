"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import { z } from "zod";
import {  updateWorkspaceSchema } from "../schemas";
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
import { ArrowLeft, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface EditWorkspaceFormProps {
  onCancel?: () => void;
  initialValues:Workspace
}
export const EditWorkspaceForm = ({ onCancel,initialValues }: EditWorkspaceFormProps) => {
  const router = useRouter()
  const { mutate, isPending } = useUpdateWorkspace();
  const [DeleteDialog,confirmDelete] = useConfirm(
    "Delete this dialog",
    "This action cannot be undone",
    "destructive"
  )
  const [ResetDialog,confirmReset] = useConfirm(
    "Reset invite link",
    "This action cannot be undone",
    "destructive"
  )
  const {mutate:deleteWorkspace,isPending:isDeletingWorkspace} = useDeleteWorkspace()
  const {mutate:resetInviteCode,isPending:isResetingInviteCode} = useResetInviteCode()
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues:{
      ...initialValues,
      image:initialValues.imageUrl ??""
    },
  });
  const onSubmit = (vals: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...vals,
      image: vals.image instanceof File ? vals.image : "",
    };
    mutate(
      {
        form:finalValues,
        param:{workspaceId:initialValues.$id}
      },
      {
        onSuccess({data}) {
          router.push(`/workspaces/${data.$id}`)
        },
      }
    );
  };

  const handleDelete =async () => {
    const ok = await confirmDelete()
    if(!ok) return
    deleteWorkspace({
      param:{workspaceId:initialValues.$id}
    },{
      onSuccess:()=>{
        router.push("/")
      }
    })
  }

  const handleResetInviteCode =async () => {
    const ok = await confirmReset()
    if(!ok) return
    resetInviteCode({
      param:{workspaceId:initialValues.$id}
    },{
      onSuccess:()=>{
        router.refresh()
      }
    })
  }

  const handleCopyInviteLink = ()=>
    navigator.clipboard.writeText(fullInviteLink)
    .then(()=>toast.success("Invite copied to clipboard successfully!"))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };
  const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`
  return (
    <div className=" flex flex-col gap-y-4">
      <DeleteDialog  />
      <ResetDialog />
    <Card className=" w-full h-full border-none shadow-none rounded-md">
      <CardHeader className=" flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button size={"sm"} variant={"secondary"} onClick={onCancel?onCancel:()=> router.push(`/workspaces/${initialValues.$id}`)}>
          Back
          <ArrowLeft className=" size-4 mr-2"/>
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
                         {field.value?(
                            <Button
                            type="button"
                            disabled={isPending}
                            variant={"destructive"}
                            size={"xs"}
                            className=" w-fit mt-2"
                            onClick={() => {field.onChange(null)
                              if(inputRef.current)inputRef.current.value =""
                            }}
                          >
                            Remove image
                          </Button>
                        ):(
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
                        )
                        }
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
                className={`${!onCancel && 'invisible'}`}
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
                <h3 className=" font-bold">
                Invite members
                </h3>
                <p className="text-sm text-muted-foreground">
                 Use the link to inivite members to your workspace
                </p>
                <div className=" mt-4">
             <div className=" flex items-center gap-x-2">
             <Input disabled value={fullInviteLink} />
             <Button
             onClick={handleCopyInviteLink}
             variant={"secondary"}
             className=" size-12"
             >
                   <CopyIcon  className=" size-5"/>
             </Button>
             </div>
                </div>
            <div className=" my-7">
               <Separator />
            </div>
            <Button
             className=" mt-6 w-fit ml-auto"
             variant={"destructive"}
             type="button"
             disabled={isPending||isResetingInviteCode}
             onClick={handleResetInviteCode}
            >
             Reset invite link
            </Button>
            </div>
        </CardContent>
    </Card>
    <Card className=" w-full h-full border-none shadow-none">
        <CardContent className=" p-7">
            <div className=" flex flex-col">
                <h3 className=" font-bold">
                Danger zone
                </h3>
                <p className="text-sm text-muted-foreground">
                  Deleting a workspace is irreversible and will remove all associated data .
                </p>
                <Button
                className=" mt-6 w-fit ml-auto"
                size={"sm"}
                variant={"destructive"}
                type="button"
                disabled={isDeletingWorkspace||isPending }
                onClick={handleDelete}
                >
                   Delete workspace
                </Button>
            </div>
        </CardContent>
    </Card>
  
    </div>
  );
};
