import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?:string
}

export const ProjectAvatar = ({
  image,
  name,
  className,
  fallbackClassName
}: ProjectAvatarProps) => {
  if (image) {
    return (
      <div
        className={` relative size-5
     rounded-md overflow-hidden ${className}`}
      >
        <Image src={image} alt={name.charAt(0)} fill className=" object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={` size-5 rounded-md ${className}`}>
      <AvatarFallback className={` text-white bg-blue-500 font-semibold text-sm uppercase ${fallbackClassName}`}>
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
