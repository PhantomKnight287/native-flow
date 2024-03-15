import { create } from "zustand";
import { TreeNode } from "@/structs/tree";

export interface ActiveElement {
  element?: TreeNode;
  id?: string;
  activeIndex?: string;
  setActiveElement: (element: TreeNode, activeIndex: string) => void;
  clearActiveElement: () => void;
}

export const useActiveElement = create<ActiveElement>((setter) => ({
  element: undefined,
  activeIndex: undefined,
  setActiveElement: (element, activeIndex) =>
    setter((state) => ({ element, id: element.id, activeIndex })),
  clearActiveElement: () => setter({ id: undefined, element: undefined }),
}));
