'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from 'zod'
import qs from 'query-string'
import FileUpload from '@/components/file-upload'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useModel } from '@/hooks/use-model-store'


export const MessageFileModel = () =>{
    const {isOpen,onClose,type,data} = useModel();
    const router = useRouter();

    const isModelOpen = isOpen && type === 'messageFile'


    const formSchema = z.object({
        fileUrl:z.string().min(1,{
        message:'Attachment is required'
        })
    })
    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            fileUrl:"",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const handelClose = () => {
        form.reset();
        onClose();
    }

    const onSubmit = async(values:z.infer<typeof formSchema>) =>{
        try {
            const query = data?.query
            const url = qs.stringifyUrl({
                url:data?.apiUrl || '',
                query,
            })

            await axios.post(url,{
                ...values,
                content: values.fileUrl
            })
            form.reset();
            router.refresh()
            onClose();
        } catch (error) {
           console.error(error);
        }
    }
    return (
    <Dialog open={isModelOpen} onOpenChange={handelClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6'>
                <DialogTitle className='text-xl text-center font-bold'>
                   Add an attachment
                </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                    Select the file to be shared
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className='space-y-8'>
                    <div className='space-y-8 px-6'>
                        
                        <div className='flex items-center justify-center text-center'>
                            <FormField
                                control={form.control}
                                name='fileUrl'
                                render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <FileUpload
                                            endpoint='messageFile'
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                      </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter className='bg-gray-100 px-6 py-4'>
                        <Button variant='primary' disabled={isLoading}>
                            Send
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    )
}
