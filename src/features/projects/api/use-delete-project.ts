import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.projects)[":projectId"]["$delete"]>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ param }): Promise<ResponseType> => {
        const response = await client.api.projects[":projectId"]["$delete"]({
          param,
        });
        if (!response.ok) throw new Error("Failed to delete project");
        return (await response.json()) as ResponseType;
      },
      onSuccess: ({data}) => {
        toast.success("Deleted project successfully!", {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["project",data.$id] });
      },
      onError() {
        toast.error("Failed to delete project", {
          style: {
            backgroundColor: "red",
          },
        });
      },
    });
    return mutation;
  };
  
