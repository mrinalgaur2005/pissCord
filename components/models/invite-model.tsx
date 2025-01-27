"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModel } from "@/hooks/use-model-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";



export const InviteModel = () => {
  const { isOpen,onOpen, onClose, type ,data } = useModel();
  const isModelOpen = isOpen && type === "invite";  
  const origin = useOrigin();
  const[iscopied,setIsCopied]=useState(false);
  const[isLoading,setIsLoading]=useState(false);

  const inviteUrl = `${origin}/invite/${data?.server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);

    setTimeout(() => {
        setIsCopied(false);
    },1000)
  }

  const onNew = async() => {
    try {
        setIsLoading(true);
        const response = await axios.patch(`/api/servers/${data?.server?.id}/invite-code`);

        onOpen("invite",{server : response.data})

    } catch (error) {
        console.error(error)
    }finally{
        setIsLoading(false);
    }
  }
  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6'>
                <DialogTitle className='text-xl text-center font-bold'>
                    Invite your fellow mates
                </DialogTitle>
            </DialogHeader>
            <div className="p-6">
                <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Server Invite Link : 
                </Label>
                <div className="flex items-center mt-2 gap-x-2">
                    <Input
                    disabled={isLoading}
                    className="bg-zinc-300/50 border-0 focus-visible-ring-0 text-black focus-visible-ring-offset-0"
                    value={inviteUrl}
                    />
                    <Button size='icon'
                    disabled={isLoading}
                    onClick={onCopy}
                    >
                        {iscopied ? 
                            <Check/> : <Copy className="w-4 h-4"/>
                            }                        
                    </Button>
                </div>
                <Button
                onClick={onNew}
                disabled={isLoading}
                variant="link"
                size='sm'
                className="text-xs text-zinc-500 mt-4"
                >
                    Genrate A New Link
                    <RefreshCcw className="w-4 h-4 ml-2"/>
                </Button>
            </div>
        </DialogContent>
    </Dialog>
    )
}