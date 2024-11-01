import {z} from 'zod'
import { TASKSTATUS } from './types'


export const createTaskSchema = z.object({
    name:z.string().min(1,{
        message:"Required"
    }),
    status:z.nativeEnum(TASKSTATUS,{required_error:"Required"}),
    workspaceId:z.string().trim().min(1,"Required"),
    projectId:z.string().trim().min(1,"Required"),
    assigneeId:z.string().trim().min(1,"Required"),
    dueDate:z.coerce.date(),
    description:z.string().optional()
})