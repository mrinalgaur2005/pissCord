'use client';

import {CreateServerModel} from "@/components/models/create-server-model"
import { useEffect, useState } from "react";
import { InviteModel } from "@/components/models/invite-model";
import { EditServerModel } from "@/components/models/edit-server-model";
import { ManageMembersModel } from "@/components/models/manage-members-model";
import { CreateChannelModel } from "@/components/models/create-channels-model";
import { LeaveServerModel } from "@/components/models/leave-server-model";
import { DeleteServerModel } from "@/components/models/delete-server-model";

export const ModelProvider = () =>{
    const [isMounted,setIsMounted]=useState(false);
    
    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted) return null;

    return(
        <>
            <CreateServerModel/>
            <InviteModel/>
            <EditServerModel/>
            <ManageMembersModel/>
            <CreateChannelModel/>
            <LeaveServerModel/>
            <DeleteServerModel/>
        </>
    )
}