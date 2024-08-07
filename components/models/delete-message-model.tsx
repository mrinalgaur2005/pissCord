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
import qs from 'query-string'


export const DeleteMessageModel = () => {
  const { isOpen, onClose, type ,data } = useModel();
  const isModelOpen = isOpen && type === "deleteMessage";  
  const[isLoading,setIsLoading]=useState(false);
  
  const onClick= async () => {
    try {
        setIsLoading(true)
        
        const url = qs.stringifyUrl({
            url: data?.apiUrl || '',
            query:data?.query
        })
        await axios.delete(url);
        onClose();        
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
                    Delete Message
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Are you sure you want to delete the message
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