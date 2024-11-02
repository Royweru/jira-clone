"use client"
import React from 'react'
import {format} from 'date-fns' 

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover,PopoverTrigger,PopoverContent } from './ui/popover'
import { CalendarIcon } from 'lucide-react'

interface DatePickerProps{
    value:Date|undefined,
    onChange:(date:Date) =>void,
    className?:string,
    placeholder?:string
}
export const DatePicker = ({
    value,
    onChange,
    className,
    placeholder="Select date"
}:DatePickerProps) => {
  return (
    <Popover>
        <PopoverTrigger asChild>
              <Button
               variant={"outline"}
               size={"lg"}
               className={cn('w-full justify-center text-left font-normal px-3',
                !value &&'text-muted-foreground',
                className
               )}
              >
                 <CalendarIcon  className=' mr-2 h-4 w-4'/>
                 {value? format(value,'ppp'):<span>{placeholder}</span>}
              </Button>
        </PopoverTrigger>
        <PopoverContent>
            <Calendar 
              mode='single'
              selected={value}
              onSelect={(date)=>onChange(date as Date)}
              initialFocus
              />
        </PopoverContent>
    </Popover>
  )
}
