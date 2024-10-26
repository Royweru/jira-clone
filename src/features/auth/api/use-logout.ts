/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>


export const useLogout = ()=>{
    const router = useRouter()
 const queryClient = useQueryClient()

    const mutation = useMutation<
    ResponseType,
    Error
    >({
        mutationFn:async () => {
            const response = await client.api.auth.logout["$post"]()
            return await response.json()
        },
        onSuccess:()=>{
            toast.success("logged out")
            router.refresh()

            queryClient.invalidateQueries({queryKey:["current"]})
            queryClient.invalidateQueries({queryKey:["workspaces"]})
        },
        onError(){
            toast.error("Failed to log out")
        }
    })
    return mutation
}