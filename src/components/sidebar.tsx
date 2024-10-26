import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'
import { Navigation } from './navigation'
import { WorkspaceSwitcher } from './workspace-switcher'

export const Sidebar = () => {
  return (
    <aside className=' h-full bg-neutral-100 p-4 w-full'>
        <Link href={ '/'}>
           <Image 
             src={"/logo.svg"}
             alt=''
             width={164}
             height={48}
             />
        </Link>
        <Separator className=' my-4'/>
        <WorkspaceSwitcher />
        <Separator className=' my-4'/>
        <Navigation />
    </aside>
  )
}