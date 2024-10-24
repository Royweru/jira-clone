import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogin = ()=>{
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn:async ({json}) => {
            const response = await client.api.auth.login["$post"]({json})
            return await response.json()
        },
        onSuccess:()=>{
            toast.success("You are logged in",{
                style:{
                    "backgroundColor":"green"
                }
            })
            router.refresh()
            queryClient.invalidateQueries({queryKey:["current"]})
        },
        onError:()=>{
           toast.error("Something went wrong while trying to log you in!")
        }
    })
    return mutation
}