import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import React from 'react'

const WorkspaceIdPage = async ({params}:{
  params:{workspaceId:string}
}) => {
    const user = await getCurrent()

    if(!user) redirect("/sign-in")
  return (
    <div className=' font-semibold'>
        Workspace Id : {params.workspaceId}
    </div>
  )
}

export default WorkspaceIdPage