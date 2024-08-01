import { useState,useEffect } from "react";

export const useOrigin = () =>{
    const [ismounted,setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[]);

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin :""

    if(!ismounted)  return "";

    return origin;
}