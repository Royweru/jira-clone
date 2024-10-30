import React from 'react'
import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import { MembersList } from '@/features/members/components/members-list'


const WorkspaceIdMembers = () => {
    const user = getCurrent()
    if(!user) redirect("/sign-in")

  return (
    <div className=' w-full lg:max-w-xl'>
        <MembersList />
    </div>
  )
}

export default WorkspaceIdMembers