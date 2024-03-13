import {create} from "zustand"
import {ElementTypes} from "@/types/rxjs-event";
import {ElementProps} from "@/types/props";

export interface ActiveElement{
    type?:ElementTypes,
    props:ElementProps,
    id?:string,
    setActiveElement:(type:ElementTypes,props:ElementProps,id:string)=>void,
    clearActiveElement:()=>void
}


export const useActiveElement = create<ActiveElement>((setter)=>({
    props:{},
    setActiveElement:(element,props,id)=>setter((state)=>({props,type:element,id})),
    clearActiveElement:()=>setter({type:undefined,props:{},id:undefined})
}))
