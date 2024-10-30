"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useGetMembers } from "../api/use-get-members";
import { Fragment } from "react";
import { MemberAvatar } from "./member-avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useDeleteMember } from "../api/use-delete-member";
import { useUpdateMember } from "../api/use-update-member";
import { MembersRole } from "../types";
import { useConfirm } from "@/hooks/use-confirm";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();
  const [ConfirmDialog, confirm] = useConfirm(
    "Remove member",
    "This member will be removed from the workspace",
    "destructive"
  );
  const handleUpdateMember = (memberId: string, role: MembersRole) => {
    updateMember({
      json: {
        role,
      },
      param: {
        memberId,
      },
    });
  };
  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();
    if (!ok) return;
    deleteMember(
      {
        param: {
          memberId,
        },
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };
  return (
    <>
    <ConfirmDialog />
    <Card className=" w-full h-full border-none shadow-none">
      <CardHeader className=" flex flex-row items-center gap-x-4 space-y-7 p-7">
        <Button asChild variant={"secondary"} size={"sm"}>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className=" size-4 mr-2" />
            Back
          </Link>
        </Button>
        <CardTitle>Members list</CardTitle>
      </CardHeader>
      <div className=" px-7">
        <Separator />
      </div>
      <CardContent>
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className=" flex items-center  gap-2">
              <MemberAvatar
                name={member.name}
                className=" size-10"
                fallbackClassName=" text-lg"
              />
              <div className=" flex flex-col">
                <p className=" text-sm font-medium">{member.name}</p>
                <p className=" text-xs text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                asChild
                >
                  <Button
                    className=" ml-auto"
                    variant={"secondary"}
                    size={"icon"}
                  >
                    <MoreVerticalIcon className=" size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className=" font-medium"
                    onClick={() => handleUpdateMember(member.$id,MembersRole.ADMIN)}
                    disabled={isUpdatingMember}
                  >
                    Set as administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className=" font-medium"
                    onClick={() => handleUpdateMember(member.$id,MembersRole.MEMBER)}
                    disabled={isUpdatingMember}
                  >
                    Set as member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className=" font-medium text-amber-700 "
                    onClick={() => handleDeleteMember(member.$id)}
                    disabled={isDeletingMember}
                  >
                    Remove {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className=" my-2.5 text-neutral-300" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
    </>
  );
};
