'use client'

import { ServerWithMembersWithProfiles } from "@/types.";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings2, Trash, UserPlus, Users } from "lucide-react";
import { useModel } from "@/hooks/use-model-store";

interface serverHeaderProps {
    server: ServerWithMembersWithProfiles ;
    role?: MemberRole;
}
  
export const ServerHeader = ({
    server,
    role
}:serverHeaderProps) => {
    const {onOpen} = useModel();
    const isAdmin = role == MemberRole.ADMIN;
    const isModerator = isAdmin || role == MemberRole.MODERATOR

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger
            className="focus:outline-none"
            asChild
            >
                <button
                className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 
                border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    {server.name}
                    <ChevronDown
                    className="h-5 w-5 ml-auto"
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
            className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
            >
                {isModerator && (
                    <DropdownMenuItem
                    onClick={()=>{onOpen("invite",{server})}}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        Invite People
                        <UserPlus className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem> 
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    onClick={()=>{onOpen("editServer",{server})}}
                    className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Server Settings
                        <Settings2 className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem> 
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    onClick={()=>{onOpen("manageMembers",{server})}}
                    className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Manage Members
                        <Users className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem> 
                )}
                {isModerator && (
                    <DropdownMenuItem
                    className="px-3 py-2 text-sm cursor-pointer"
                    onClick={()=>{onOpen("createChannels",{server})}}
                    >
                        Create Channel
                        <PlusCircle className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem> 
                )}
                {isModerator && (
                    <DropdownMenuSeparator/>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    onClick={()=>{onOpen("deleteServer",{server})}}
                    >
                        Delete Server
                        <Trash className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem> 
                )}
                {!isAdmin  && (
                    <DropdownMenuItem
                    className="px-3 py-2 text-sm cursor-pointer"
                    onClick={()=>{onOpen("leaveServer",{server})}}
                    >
                        Leave Server
                        <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem> 
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 