"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
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
import FileUpload from "../file-upload";
import axios from "axios";
import { useModel } from "@/hooks/use-model-store";
import { formSchema } from "@/schemas/formSchema";
import { useEffect } from "react";


export const EditServerModel = () => {
  const { isOpen, onClose, type,data } = useModel();
  const isModelOpen = isOpen && type === "editServer";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const server = data?.server

  useEffect(() => {
    if(server){
        form.setValue("name",server.name)
        form.setValue("imageUrl",server.imageUrl)
    }
  }, [server,form])
  
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async(values:z.infer<typeof formSchema>) =>{
    try {
        await axios.patch(`/api/servers/${server?.id}`,values)
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
                    Customize The Server
                </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                    Make the server personalized for you by giving it a name and image
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className='space-y-8'>
                    <div className='space-y-8 px-6'>
                        
                        <div className='flex items-center justify-center text-center'>
                            <FormField
                                control={form.control}
                                name='imageUrl'
                                render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <FileUpload
                                            endpoint='serverImage'
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                      </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel
                                  className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'
                                  >Server Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                    disabled={isLoading}
                                    className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                    placeholder='Enter Server Name'
                                    {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
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