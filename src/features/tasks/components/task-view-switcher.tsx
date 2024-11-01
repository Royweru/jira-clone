import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import React from "react";

const TaskViewSwitcher = () => {
  return (
    <Tabs className=" flex-1 w-full border rounded-lg">
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
          >
            <PlusIcon className=" size-4 mr-2" />
            New
          </Button>
        </div>
        <Separator  className=" my-4"/>
        Data filters
        <Separator className=" my-4" />
        <>
        <TabsContent value="table" className=" mt-0">
           Table
        </TabsContent>
        <TabsContent value="kanban" className=" mt-0">
           Kanban
        </TabsContent>
        <TabsContent value="calender" className=" mt-0">
           Calender
        </TabsContent>
        </>
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
