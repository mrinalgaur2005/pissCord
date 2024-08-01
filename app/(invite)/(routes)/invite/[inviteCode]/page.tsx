import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useState } from "react";
interface InviteCodePageParams {
    params:{
        inviteCode:string;
    };
}


const InviteCodePage = async({params}:InviteCodePageParams) => {
    const [isProfileThere,setIsProfileThere]=useState(false)
    const profile = await currentProfile();

    if(!profile && !isProfileThere){
        setIsProfileThere(true)
        return auth().redirectToSignIn();
    }

    if (!params.inviteCode){
        return redirect("/");
    }

    const joinedServer = await db.server.findFirst({
        where:{
            inviteCode:params.inviteCode,
            members:{
                some:{
                    profileId:profile?.id,
                }
            },
        }

    })

    if(joinedServer){
        return redirect(`/servers/${joinedServer.id}`)
    }

    const server = await db.server.update({
        where:{
            inviteCode:params.inviteCode,
        },
        data:{
            members:{
                create:[
                    {
                        profileId:profile?.id as string,

                    }
                ]
            }
        }
    });

    if(server){
        return redirect(`/servers/${server.id}`)
    }


    return (
        <div>
            This Is The Invite Page
        </div>
    );
}
 
export default InviteCodePage;