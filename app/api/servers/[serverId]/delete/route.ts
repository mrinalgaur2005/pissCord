import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!params.serverId) {
      return new NextResponse("Server Id missing", { status: 400 });
    }
    const server = await db.server.delete({
      where: {
        id: params.serverId,
      },
    });
    return NextResponse.json({ server });
  } catch (error) {
    console.log("[SERVER_ID_LEAVE] \n", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}