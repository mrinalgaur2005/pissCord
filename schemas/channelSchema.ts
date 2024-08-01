import { ChannelType } from "@prisma/client";
import { z } from "zod";

export const channelSchema = z.object({
    name:z.string().min(1,{
        message:'Channel name is required'
    }).refine(
        name => name !== 'General',
        {
            message:"Channel Name cant be name general"
        }
    ),
    type: z.nativeEnum(ChannelType)
})