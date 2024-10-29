import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import * as z from 'zod'
import { Hono } from "hono";
import { createAdminClient } from "@/lib/appwrite";


const app = new Hono()
.get("/",
    sessionMiddleware,
    zValidator("query",
        z.object({workspaceId:z.string()})
    ),
    async(c) =>{
        const {users} = await createAdminClient()
        
    }
)

export default app