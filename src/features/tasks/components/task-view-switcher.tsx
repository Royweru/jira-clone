"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import React from "react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-task";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const TaskViewSwitcher = () => {
  const[view,setView] = useQueryState("task-view",{
    defaultValue:"table"
  })
  const [{ status, assigneeId, projectId, dueDate }] =
  useTaskFilters();

  const workspaceId = useWorkspaceId()
  const {open} = useCreateTaskModal()
  const {data:tasks,isLoading:tasksLoading} = useGetTasks({
    workspaceId,
    assigneeId,
    projectId,
    dueDate,
    status,
  })
  return (
    <Tabs className=" flex-1 w-full border rounded-lg"
    defaultValue={view}
    onValueChange={setView}
    >
      <div className=" h-full flec flex-col overflow-auto p-4">
        <div className=" flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className=" w-full lg:w-auto">
            <TabsTrigger className=" h8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className=" h8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className=" h8 w-full lg:w-auto" value="calender">
              Calender
            </TabsTrigger>
          </TabsList>
          <Button
            size={"sm"}
            className=" w-full lg:w-auto"
            onClick={open}
          >
            <PlusIcon className=" size-4 mr-2" />
            New
          </Button>
        </div>
        <Separator  className=" my-4"/>
        {tasksLoading?(
          <div className=" w-full border rounded-lg h-[270px] flex flex-col items-center  justify-center">
         <Loader  className=" size-6 animate-spin text-muted-foreground"/>
          </div>
        ):<DataFilters />}
        <Separator className=" my-4" />
        <>
        <TabsContent value="table" className=" mt-0">
          <DataTable  columns={columns} data={tasks?.documents ??[]}/>
        </TabsContent>
        <TabsContent value="kanban" className=" mt-0">
        {JSON.stringify(tasks)}
        </TabsContent>
        <TabsContent value="calender" className=" mt-0">
        {JSON.stringify(tasks)}
        </TabsContent>
        </>
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
