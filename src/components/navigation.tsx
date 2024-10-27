"use client"

import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { SettingsIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {GoCheckCircle, GoCheckCircleFill, GoHome,GoHomeFill} from 'react-icons/go'

const routes = [
    {
        label:"Home",
        href:"",
        icon:GoHome,
        activeIcon:GoHomeFill
    },
    {
        label:" My tasks",
        href:"/tasks",
        icon:GoCheckCircle,
        activeIcon:GoCheckCircleFill
    },
    {
        label:"Settings",
        href:"/settings",
        icon:SettingsIcon,
        activeIcon:SettingsIcon
    },
    {
        label:"Members",
        href:"/members",
        icon:UsersIcon,
        activeIcon:UsersIcon
    },
]
export const Navigation = () => {
    const workspaceId = useWorkspaceId()
    console.log({id: workspaceId})
    const pathname = usePathname()
    console.log({currentpathName:pathname})
  return (
    <ul>
        {routes.map((item)=>{
            const fullHref= `/workspaces/${workspaceId}${item.href}`
             console.log({FullHref:fullHref})

            const isActive = pathname ===fullHref
            console.log({isActive:isActive})

             const Icon = isActive?item.activeIcon:item.icon
            return(
                <Link
                key={item.href}
                href={fullHref}
                >
                    <div className={`
                     flex items-center gap-2.5 p-2.5
                      rounded-md font-medium hover:text-primary transition text-neutral-500
                      ${isActive && 'bg-white shadow-sm hover:opacity-100 text-primary'}
                    `}>
                       <Icon className=' size-5 text-neutral-500' />
                       {item.label}
                    </div>
                </Link>
            )
        })}
    </ul>
  )
}
