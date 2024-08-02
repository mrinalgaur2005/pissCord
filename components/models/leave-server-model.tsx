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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export const LeaveServerModel = () => {
  const { isOpen, onClose, type ,data } = useModel();
  const isModelOpen = isOpen && type === "leaveServer";  
  const[isLoading,setIsLoading]=useState(false);
  const router = useRouter();
  
  const onClick= async () => {
    try {
        setIsLoading(true)
        
        await axios.patch(`/api/servers/${data?.server?.id}/leave`);
        onClose()
        router.refresh();
        router.push('/')
        
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
                    Leave '{data?.server?.name}'
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Are you sure you want to leave  
                    <span className="font-bold text-zinc-700"> {data?.server?.name}?</span>
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