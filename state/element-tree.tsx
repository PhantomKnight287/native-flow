import { TreeNode } from "@/structs/tree";
import { create } from "zustand";

interface ElementTree {
  elements: TreeNode[];
  setElements: (nodes: TreeNode[]) => void;
  addElement: (id: string, newNode: TreeNode, index?: number) => void;
  updateElement: (id: string, props: TreeNode["properties"]) => void;
}

export const useElementsTree = create<ElementTree>((set) => ({
  elements: [],
  setElements(nodes) {
    return set({ elements: nodes });
  },
  addElement(id, newNode) {
    set((state) => {
      const old = [...state.elements];
      const traverseAndAdd = (nodes: TreeNode[]): boolean => {
        for (const node of nodes) {
          if (node.id === id && node.childrensAllowed) {
            node.addChild(newNode);
            return true;
          }
          if (node.children.length > 0 && traverseAndAdd(node.children)) {
            return true;
          }
        }
        return false;
      };

      traverseAndAdd(old);

      return { elements: old };
    });
  },
  updateElement(id: string, props) {
    set((state) => {
      const old = [...state.elements];
      const traverseAndAdd = (nodes: TreeNode[]): boolean => {
        for (const node of nodes) {
          if (node.id === id) {
            node.properties = { ...node.properties, ...props };
            return true;
          }
          if (node.children.length > 0 && traverseAndAdd(node.children)) {
            return true;
          }
        }
        return false;
      };

      traverseAndAdd(old);

      return { elements: old };
    });
  },
}));
