import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ExternalLinkIcon, TrashIcon } from "lucide-react";

import React from 'react'

interface TaskActionsProps{
    id:string,
    projectId:string,
    children:React.ReactNode
}
export const TaskActions = ({id,projectId,children}:TaskActionsProps) => {
  return (
    <div className=" flex justify-end">
        <DropdownMenu modal={false}>
           <DropdownMenuTrigger asChild>
          {children}
           </DropdownMenuTrigger>
           <DropdownMenuContent>

            <DropdownMenuItem
             onClick={()=>{}}
             disabled={false}
             className=" font-medium p-[10px]"
            >
               <ExternalLinkIcon className=" size-4 mr-2 stroke-2"/>
               Task details
            </DropdownMenuItem>

            <DropdownMenuItem
             onClick={()=>{}}
             disabled={false}
             className=" font-medium p-[10px]"
            >
               <ExternalLinkIcon className=" size-4 mr-2 stroke-2"/>
               Open project
            </DropdownMenuItem>

            <DropdownMenuItem
             onClick={()=>{}}
             disabled={false}
             className=" font-medium p-[10px]"
            >
               <Pencil1Icon className=" size-4 mr-2 stroke-2"/>
               Edit task
            </DropdownMenuItem>

            <DropdownMenuItem
             onClick={()=>{}}
             disabled={false}
             className=" text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            >
               <TrashIcon className=" size-4 mr-2 stroke-2"/>
               Delete Task
            </DropdownMenuItem>

           </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
