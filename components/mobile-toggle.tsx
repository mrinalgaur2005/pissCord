import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet'
import { Button } from "./ui/button"
import NavSideBar from "./navigation/navigation-sidebar"
import ServerSideBar from "./server/server-sidebar"

export const MobileToggle = ({
    serverId,
}:{
    serverId:string
}) =>{
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavSideBar/>
                </div>
                <ServerSideBar
                serverId={serverId}
                />
            </SheetContent>
        </Sheet>
    )
}