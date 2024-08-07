'use client'

import { Member, Message, Profile } from "@prisma/client"
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { MessageWithMemberWithProfile } from "@/types.";
import { ChatItem } from "./chat-item";
import {format} from 'date-fns';
import { useChatSocket } from "@/hooks/use-chat-socket";

const DATE_FORMAT= 'd MMM yyy , HH:mm'


interface ChatMessagesProps{
    name:string;
    member:Member;
    chatId:string;
    apiUrl:string;
    socketUrl:string;
    socketQuery: Record<string,string>
    paramKey: 'channelId' | 'conversationId'
    paramValue:string;
    type:'channel'|'conversation'
}


export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}:ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`
    const updateKey = `chat:${chatId}:messages:update`

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });

    useChatSocket({queryKey,addKey,updateKey})

    // @ts-ignore
    if (status === "pending") {
        return (
          <div className="flex flex-col flex-1 justify-center items-center">
            <Loader2 className="h-7 w-7 text-zinc-500 animate-spin m-7"/>
            <p className="text-sx text-zinc-500 dark:text-zinc-400">
              Loading Messages....
            </p>
          </div>
        );
    }

    if (status === "error") {
        return (
          <div className="flex flex-col flex-1 justify-center items-center">
            <ServerCrash className="h-7 w-7 text-zinc-500" />
            <p className="text-sx text-zinc-500 dark:text-zinc-400">
              Something went wrong
            </p>
          </div>
        );
      }

    // console.log(data);
    
    return(
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1"/>
            <ChatWelcome
            type={type}
            name={name}
            />
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages.map((group,i)=>(
                    <Fragment key={i}>
                        {group.items.map((message:MessageWithMemberWithProfile)=>(
                            <ChatItem
                            key={message.id}
                            currentMember={member}
                            member = {message.member}
                            id={message.id}
                            content={message.content}
                            fileUrl={message.fileUrl}
                            deleted={message.deleted}
                            timestamp={format(new Date(message.createdAt),DATE_FORMAT)}
                            isUpdated={message.updatedAt !== message.createdAt}
                            socketUrl={socketUrl}
                            socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}