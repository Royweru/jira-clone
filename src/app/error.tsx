"use client"

import { Button } from '@/components/ui/button'
import { AlertTriangleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className=' min-h-screen flex flex-col gap-y-2 items-center justify-center'>
        <AlertTriangleIcon  className=' size-14 text-rose-700 font-bold'/>
        <p className=' text-sm text-muted-foreground'>
       Something went wrong
        </p>
        <Button variant={"secondary"}>
         <Link href={"/"}>
          Back to home
         </Link>
        </Button>
    </div>
  )
}

export default ErrorPage