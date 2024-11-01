import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"]
>;

export const useResetInviteCode = () => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async ({  param }):Promise<any> => {
      const response = await client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]({
        param
      });
      if (!response.ok) throw new Error("Failed to update workspace");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Invite code reset!", {
        style: {
          backgroundColor: "green",
          color:"white"
        },
      });
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError() {
      toast.error("Failed to reset invite code", {
        style: {
          backgroundColor: "red",
        },
      });
    },
  });
  return mutation;
};
