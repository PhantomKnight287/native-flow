import { create } from "zustand";
import { TreeNode } from "@/structs/tree";

export interface ActiveElement {
  element?: TreeNode;
  id?: string;
  setActiveElement: (element: TreeNode) => void;
  clearActiveElement: () => void;
}

export const useActiveElement = create<ActiveElement>((setter) => ({
  element: undefined,
  setActiveElement: (element) =>
    setter((state) => ({ element, id: element.id })),
  clearActiveElement: () => setter({ id: undefined, element: undefined }),
}));
