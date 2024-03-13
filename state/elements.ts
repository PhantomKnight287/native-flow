import { create } from "zustand";
import { Element } from "@/types/elements";

export interface ElementsState {
  elements: Element[];
  addElement: (element: Element) => void;
  clearElements: () => void;
  updateElement: (
    index: number,
    props?: Element["props"],
    nativeProps?: Element["nativeProps"],
    position?: Element["position"],
    specialFields?: Element["specialFields"]
  ) => void;
  removeElement: (index: number) => void;
}
export const useElements = create<ElementsState>((setter) => ({
  elements: [],
  addElement: (element) =>
    setter((state) => ({ elements: [...state.elements, element] })),
  clearElements: () => setter(() => ({ elements: [] })),
  updateElement: (index, props, nativeProps, position, specialFields) =>
    setter((state) => {
      const updatedElements = [...state.elements];
      if (index >= 0 && index < updatedElements.length) {
        updatedElements[index] = {
          ...updatedElements[index],
          props: { ...updatedElements[index].props, ...(props as any) },
          nativeProps: {
            ...updatedElements[index].nativeProps,
            ...nativeProps,
          },
          position: !position ? updatedElements[index].position : position,
          specialFields: {
            ...updatedElements[index].specialFields,
            ...specialFields,
          },
        };
      }
      return { elements: updatedElements };
    }),
  removeElement: (index) =>
    setter((state) => {
      const updatedElements = [...state.elements];
      if (index >= 0 && index < updatedElements.length) {
        updatedElements.splice(index, 1);
      }
      return { elements: updatedElements };
    }),
}));
