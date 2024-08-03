"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useModel } from "@/hooks/use-model-store";
import { channelSchema } from "@/schemas/channelSchema";
import { ChannelType } from "@prisma/client";
import qs from "query-string"
import { useEffect } from "react";


export const EditChannelModel = () => {
  const { isOpen, onClose, type,data } = useModel();
  const isModelOpen = isOpen && type === "editChannel";


  const form = useForm({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: "",
      type:data?.channel?.type || ChannelType.TEXT,
    },
  });

  useEffect(()=>{
    if (data?.channel){
        form.setValue('name',data?.channel?.name);
        form.setValue('type',data?.channel?.type);
    }
  },[form,data?.channel])

  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async(values:z.infer<typeof channelSchema>) =>{
    try {
        const url = qs.stringifyUrl({
            url:`/api/channels/${data?.channel?.id}`,
            query:{
                serverId:data?.server?.id
            }
        })
        await axios.patch(url,values)
        form.reset();
        router.refresh();
        onClose();
    } catch (error) {
       console.error(error);
    }
}

  const handelClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isModelOpen} onOpenChange={handelClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6'>
                <DialogTitle className='text-xl text-center font-bold'>
                    Edit Channel
                </DialogTitle>

            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className='space-y-8'>
                    <div className='space-y-8 px-6'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel
                                  className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'
                                  >
                                    Channel Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                    disabled={isLoading}
                                    className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                    placeholder='Enter Channel Name'
                                    {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Channel Type
                                    </FormLabel>
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                            className="bg-zinc-300/50 border-0 focus:ring text-black ring-offset-0 focus:ring-offset-0
                                                        capitalize outline-none"
                                            >
                                                <SelectValue placeholder="Select a channel type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(ChannelType).map((type)=>(
                                                <SelectItem 
                                                key={type}
                                                value={type}
                                                className="capitalize"
                                                >
                                                    {type.toLowerCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter className='bg-gray-100 px-6 py-4'>
                        <Button variant='primary' disabled={isLoading}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    )
}