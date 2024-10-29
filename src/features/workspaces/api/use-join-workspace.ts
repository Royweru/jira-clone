import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({  param,json }): Promise<ResponseType> => {
      const response = await client.api.workspaces[":workspaceId"]["join"]["$post"]({
        param,json
      });
      if (!response.ok) throw new Error("Failed to join workspace");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Joined workspace!", {
        style: {
          backgroundColor: "green",
          color:"white"
        },
      });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError() {
      toast.error("Failed to join workspace", {
        style: {
          backgroundColor: "red",
        },
      });
    },
  });
  return mutation;
};
