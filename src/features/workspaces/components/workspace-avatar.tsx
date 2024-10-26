import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

export const WorkspaceAvatar = ({
  image,
  name,
  className,
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={` relative size-10
     rounded-md overflow-hidden ${className}`}
      >
        <Image src={image} alt={name.charAt(0)} fill className=" object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={` size-10 rounded-md ${className}`}>
      <AvatarFallback className=" text-white bg-blue-500 font-semibold text-lg uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
