import { Loader } from 'lucide-react'
import React from 'react'

const DashboardLoading = () => {
  return (
    <div className=' min-h-screen flex items-center justify-center '>
        <Loader  className=' size-7 animate-spin text-muted-foreground font-bold'/>
        </div>
  )
}

export default DashboardLoading