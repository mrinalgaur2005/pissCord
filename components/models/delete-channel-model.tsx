"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModel } from "@/hooks/use-model-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from 'query-string'


export const DeleteChannelModel = () => {
  const { isOpen, onClose, type ,data } = useModel();
  const isModelOpen = isOpen && type === "deleteChannel";  
  const[isLoading,setIsLoading]=useState(false);
  const router = useRouter();
  
  const onClick= async () => {
    try {
        setIsLoading(true)
        
        const url = qs.stringifyUrl({
            url:`/api/channels/${data?.channel?.id}`,
            query:{
                serverId:data?.server?.id
            }
        })
        await axios.delete(url);
        onClose();
        router.push('/');
        router.refresh();
        
    } catch (error) {
        console.log(error)
    } finally{
        setIsLoading(false)
    }
  }
  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6'>
                <DialogTitle className='text-xl text-center font-bold'>
                    Delete '{data?.channel?.name}'
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Are you sure you want to delete 
                    <span className="font-bold text-zinc-700"> #{data?.channel?.name}?</span>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="bg-gray-100 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                    <Button
                    className="ml-auto"
                    disabled={isLoading}
                    onClick={onClose}
                    variant="ghost"
                    >
                        Cancel
                    </Button>
                    <Button
                    disabled={isLoading}
                    onClick={onClick}
                    variant="primary">
                        Confirm
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}