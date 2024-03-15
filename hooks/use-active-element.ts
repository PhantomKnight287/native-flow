import { useActiveElement } from "@/state/active-element";
import { useElementsTree } from "@/state/element-tree";
import { TreeNode } from "@/structs/tree";
import { useMemo } from "react";

export default function useActiveTreeNode() {
  const { activeIndex, id } = useActiveElement();
  const { elements } = useElementsTree();
  const activeElement = useMemo(() => {
    if (!activeIndex) return null;
    if (activeIndex === "-1") return elements[0];
    else if (activeIndex) {
      const indices = activeIndex!.split(".");
      indices.shift();
      let currentActive: TreeNode | null = null;
      for (let i = 0; i < indices.length; i++) {
        if (i == 0) {
          currentActive = elements[0].children[parseInt(indices[i])];
        } else {
          currentActive = !currentActive
            ? null
            : currentActive.children[parseInt(indices[i])];
        }
      }
      return currentActive;
    } else {
      return null;
    }
  }, [id, activeIndex]);
  return activeElement;
}
