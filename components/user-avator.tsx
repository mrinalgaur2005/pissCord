import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

interface UseravatarProps{
    src?:string;
    className?:string;
}
const UserAvatar = ({
    src,
    className
}:UseravatarProps) => {
    return ( 
        <Avatar className={cn(
            "h-7 w-7 md:h-10 md:w-10",
            className
        )}>
            <AvatarImage src={src}/>
        </Avatar>
    );
}
 
export default UserAvatar;