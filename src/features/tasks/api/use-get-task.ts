import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { TASKSTATUS } from "../types";

export const useGetTasks = ({
    workspaceId,
    projectId,
    status,
    assigneeId,
    dueDate,
    search
}:{
    workspaceId:string,
    projectId?:string|null,
    status?:TASKSTATUS|null,
     assigneeId?:string|null,
     search?:string|null,
   dueDate?:string|null,
}) => {

  const query = useQuery({
    queryKey: ["tasks",
        workspaceId,
        projectId,
        search,
        dueDate,
        assigneeId,
        status,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query:{
            workspaceId,
            search: search ??undefined,
            projectId:projectId ??undefined,
            assigneeId: assigneeId ??undefined,
            dueDate:dueDate?? undefined,
            status:status??undefined
        }
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const { data } = await response.json();
      console.log(data)
      return data;
    },
  });

  return query;
};
