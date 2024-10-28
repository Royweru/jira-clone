import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)[":workspaceId"]["$delete"]>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ param }): Promise<ResponseType> => {
        const response = await client.api.workspaces[":workspaceId"]["$delete"]({
          param,
        });
        if (!response.ok) throw new Error("Failed to update workspace");
        return (await response.json()) as ResponseType;
      },
      onSuccess: ({data}) => {
        toast.success("Deleted workspace successfully!", {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        queryClient.invalidateQueries({ queryKey: ["workspace",data.$id] });
      },
      onError() {
        toast.error("Failed to delete workspace", {
          style: {
            backgroundColor: "red",
          },
        });
      },
    });
    return mutation;
  };
  
