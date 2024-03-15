import { TreeNode } from "@/structs/tree";
import { create } from "zustand";

interface ElementTree {
  elements: TreeNode[];
  setElements: (nodes: TreeNode[]) => void;
  addElement: (id: string, newNode: TreeNode, index?: number) => void;
  updateElement: (activeIndex: string, props: TreeNode["properties"]) => void;
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
  updateElement(activeIndex: string, props) {
    set((state) => {
      let updated = [...state.elements];
      const indices = activeIndex.split(".");
      if (indices[0] === "-1") {
        updated[0].properties = { ...updated[0].properties, ...props };
        return { elements: updated };
      } else {
        indices.shift();
        let elementToUpdate;
        for (let i = 0; i < indices.length; i++) {
          if (i == 0) {
            elementToUpdate = updated[0].children[parseInt(indices[i])];
            continue;
          }
          elementToUpdate = !elementToUpdate
            ? null
            : elementToUpdate.children[parseInt(indices[i])];
        }
        if (elementToUpdate) {
          elementToUpdate.properties = {
            ...elementToUpdate.properties,
            ...props,
          };
        }
        return { elements: updated };
      }
    });
  },
}));
