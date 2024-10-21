import { Button } from '@/components/ui/button'
import React from 'react'

export const TestComponent = () => {
  return (
    <div className=' flex px-4 w-full gap-x-3'>
         <Button>
        Primary
      </Button>
         <Button variant={"secondary"}>
        Secondary
      </Button>
         <Button variant={"destructive"}>
        Destructive
      </Button>
         <Button variant={"ghost"}>
       Ghost
      </Button>
         <Button variant={"muted"}>
        Link
      </Button>
         <Button variant={"outline"}>
        Outline
      </Button>
         <Button variant={"teritary"}>
        Tertiary
      </Button>
    </div>
   
  )
}
