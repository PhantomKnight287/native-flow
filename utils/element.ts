import { TreeNode } from "@/structs/tree";

interface ElementAndIndex {
  element: TreeNode | null;
  index: string;
}

export function getElement(id: string, tree: TreeNode[]): ElementAndIndex {
  let foundNode: TreeNode | null = null;
  let index = "";

  const traverseAndGet = (nodes: TreeNode[], parentIndex: string): void => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const currentIndex = `${parentIndex}.${i}`;

      if (node.id === id) {
        foundNode = node;
        index = currentIndex;
        return;
      }

      if (node.children.length > 0) {
        traverseAndGet(node.children, currentIndex);
      }
    }
  };

  traverseAndGet(tree, "0");

  return { element: foundNode, index };
}
