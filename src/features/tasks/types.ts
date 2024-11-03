import { Models } from "node-appwrite";

export enum TASKSTATUS{
    BACKLOG = "BACHKLOG",
    TODO="TODO",
    IN_PROGRESS="IN_PROGRESS",
    IN_REVIEW= "IN_REVIEW",
    DONE = "DONE"
}


export type Task = Models.Document &{
    name:string,
    status:TASKSTATUS,
    assigneeId:string,
    projectId:string,
    position:number,
    dueDate:string
}