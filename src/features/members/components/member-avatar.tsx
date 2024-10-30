import { Avatar, AvatarFallback } from "@/components/ui/avatar";


interface MembersAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export const MemberAvatar = ({
  fallbackClassName,
  name,
  className,
}: MembersAvatarProps) => {
  return (
    <Avatar
      className={` size-5 transition border border-neutral-300 rounded-full ${className}`}
    >
      <AvatarFallback
        className={` text-neutral-500 bg-neutral-200 font-medium  flex justify-center items-center, ${fallbackClassName}`}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
