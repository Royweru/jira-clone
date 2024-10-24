"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Loader, LogOut } from "lucide-react";
import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const {mutate} = useLogout()
  if (!user) return null;
  const { name, email } = user;
  const avatarFallbackName = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";
  if (isLoading) {
    return (
      <div className=" size-10 flex items-center rounded-full justify-center bg-neutral-200 border-neutral-300">
        <Loader className=" size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className=" size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className=" bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallbackName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
      <div className=" flex flex-col items-center justify-center gap-2 px-2.5 py-4">
      <Avatar className=" size-[52px]  border border-neutral-300">
          <AvatarFallback className=" bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallbackName}
          </AvatarFallback>
        </Avatar>
        <div className=" flex flex-col justify-center items-center">
            <p className=" text-sm font-medium text-neutral-900"> 
                {name||
                "user"}
            </p>
            <p className="text-xs text-neutral-500">
                {email}
            </p>
        </div>
      </div>
      <Separator className="mb-1"/>
      <DropdownMenuItem 
      onClick={()=>mutate()}
      className=" h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer">
        <LogOut className=" size4 mr-2" />
      </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
