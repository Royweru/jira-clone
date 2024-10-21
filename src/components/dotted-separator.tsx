import { cn } from "@/lib/utils";


interface DottedSeparatorProps{
    className?:string,
    color?:string,
    height?:string,
    dotSize?:string,
    gapSize?:string,
    direction?:"horizontal"|"vertical"
}

export const DottedSeparator = ({
    className,
    color,
    height,
    dotSize,
    gapSize,
    direction
}:DottedSeparatorProps)=>{
  const isHorizontal = direction ==="horizontal"

  return(
    <div className={cn(isHorizontal?"w-full flex items-center":" h-full flex flex-col items-center",
        className,
    )}>
      <div 
       className={isHorizontal?'flex-grow':'flex-grow-0'}
       style={{
        width:isHorizontal?"100%":height,
        height:isHorizontal?height:"100%",
        backgroundImage:`radial-gradient(circle,${color} 25%,transparent 25%)`,
        backgroundSize:isHorizontal ? `${parseInt(dotSize as string)+parseInt(gapSize as string)} px ${height}`:
        `${height} ${parseInt(dotSize as string) +parseInt(gapSize as string)} px`,
        backgroundRepeat:isHorizontal ?"repeat-x":"repeat-y",
        backgroundPosition:"center"
       }}
      />
    </div>
  )
}