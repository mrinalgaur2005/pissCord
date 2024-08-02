import { Server } from "@prisma/client";
import {create} from "zustand";

export type ModelType = "createServer" 
                        | "invite"
                        | "editServer"
                        | "manageMembers"
                        | "createChannels"
                        | "leaveServer";

interface ModelData{
    server?:Server;
}

interface ModelStore{
    type: ModelType | null;
    data?:ModelData;
    isOpen:boolean;
    onOpen: (type:ModelType , data?:ModelData) => void;
    onClose:() => void;
}

export const useModel = create<ModelStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type: ModelType, data?: ModelData) => {
      set({ isOpen: true, type, data });
    },
    onClose: () => set({ type: null, isOpen: false }),
  }));