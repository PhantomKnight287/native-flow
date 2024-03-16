import { useActiveElement } from "@/state/active-element";
import { useElementsTree } from "@/state/element-tree";
import { TreeNode } from "@/structs/tree";
import { useMemo } from "react";

export default function useActiveTreeNode() {
  const { id } = useActiveElement();
  const { elements } = useElementsTree();

  function findActiveElement(nodes: TreeNode[]): TreeNode | null {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const found = findActiveElement(node.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
  const activeElement = useMemo(() => {
    return findActiveElement(elements);
  }, [id]);

  return activeElement;
}
