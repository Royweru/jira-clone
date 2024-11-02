import { parseAsString,parseAsStringEnum,useQueryStates } from "nuqs";
import { TASKSTATUS } from "../types";


export const useTaskFilters = () => {
  return useQueryStates({
    projectId:parseAsString,
    status:parseAsStringEnum(Object.values(TASKSTATUS)),
    assigneeId:parseAsString,
    search:parseAsString,
    dueDate:parseAsString
  })
}
