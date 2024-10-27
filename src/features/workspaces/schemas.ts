import * as z from 'zod'

export const createWorkspaceSchema = z.object({
    name:z.string().trim().min(1,{
        message:"Required"
    }),
    image:z.union([
        z.instanceof(File),
        z.string().transform((value)=>value===""?undefined:value),
    ]).optional(),
})
export const updateWorkspaceSchema = z.object({
    name:z.string().trim().min(1,{
        message:"Must be one or more characters"
    }).optional(),
    image:z.union([
        z.instanceof(File),
        z.string().transform((value)=>value===""?undefined:value),
    ]).optional(),
})