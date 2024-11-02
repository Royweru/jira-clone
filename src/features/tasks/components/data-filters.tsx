import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DatePicker } from "@/components/date-picker";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";
import { TASKSTATUS } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}
export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: projectsLoading } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  const isLoading = projectsLoading || membersLoading;

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));
  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));
  const [{ status, assigneeId, projectId, dueDate }, setFilters] =
    useTaskFilters();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TASKSTATUS) });
  };
  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : (value as string) });
  };
  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : (value as string) });
  };

  if (isLoading) return null;
  return (
    <div className=" flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className=" w-full lg:w-auto h-8">
          <div className=" flex items-center pr-2">
            <ListChecksIcon className=" size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value={TASKSTATUS.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TASKSTATUS.IN_PROGRESS}>In progress</SelectItem>
          <SelectItem value={TASKSTATUS.IN_REVIEW}>In review</SelectItem>
          <SelectItem value={TASKSTATUS.TODO}>Todo</SelectItem>
          <SelectItem value={TASKSTATUS.DONE}>Done</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className=" w-full lg:w-auto h-8">
          <div className=" flex items-center pr-2">
            <UserIcon className=" size-4 mr-2" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All Assignees</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member)=>(
            <SelectItem 
            key={member.id}
            value={member.id}
            >
           {member.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={projectId ?? undefined}
        onValueChange={(value) => onProjectChange(value)}
      >
        <SelectTrigger className=" w-full lg:w-auto h-8">
          <div className=" flex items-center pr-2">
            <FolderIcon className=" size-4 mr-2" />
            <SelectValue placeholder="All Project" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All projects</SelectItem>
          <SelectSeparator />
          {projectOptions?.map((project)=>(
            <SelectItem 
            key={project.id}
            value={project.id}
            >
           {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DatePicker
       placeholder="Due date"
       className=" h-8 w-full lg:w-auto"
       value={dueDate? new Date(dueDate):undefined}
       onChange={(date)=>{
        setFilters({dueDate:date?date.toISOString():null})
       }}
       />
    </div>
  );
};
