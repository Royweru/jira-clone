"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";
interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}
export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();
  const onSubmit = () => {
    mutate(
      {
        param: {
          workspaceId,
        },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };
  return (
    <Card className=" w-full h-full border-none shadow-none">
      <CardHeader className=" p-7 ">
        <CardTitle className=" text-xl font-bold ">Join workspace</CardTitle>
        <CardDescription>
          Y&apos;have been invited to join {initialValues.name}
        </CardDescription>
      </CardHeader>
      <div className=" px-7">
        <Separator />
      </div>
      <CardContent className=" p-7">
        <div className=" flex items-center justify-between">
          <Button
            variant={"secondary"}
            type="button"
            size={"lg"}
            disabled={isPending}
            asChild
            className=" w-full lg:w-fit"
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            size={"lg"}
            onClick={onSubmit}
            disabled={isPending}
            className=" w-full lg:w-fit"
          >
            Join workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
