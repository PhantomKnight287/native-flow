"use client";

import { Button } from "@/components/ui/button";
import useActiveTreeNode from "@/hooks/use-active-element";
import { generateReactNativeTree } from "@/lib/generate-react-native-tree";
import { formatCode } from "@/lib/prettier";

import { useActiveElement } from "@/state/active-element";
import { useElementsTree } from "@/state/element-tree";
import { TreeNode } from "@/structs/tree";
import { getElement } from "@/utils/element";
import { useRouter } from "next/navigation";

export default function LeftSidebar() {
  const { setActiveElement, id } = useActiveElement();
  const { elements, addElement } = useElementsTree();
  const activeNode = useActiveTreeNode();
  const { push } = useRouter();

  return (
    <aside
      className={
        "bg-gray-700 h-screen p-2 flex flex-col gap-2 z-20 border-r-2 border-muted"
      }
    >
      <Button
        disabled={!activeNode?.childrensAllowed}
        onClick={() => {
          const _id = crypto.randomUUID();
          if (id) {
            const e = getElement(id, elements);
            const element = new TreeNode("Input", _id, false);
            addElement(id, element);
            const indices = e.index.split(".");
            indices[indices.length - 1] = String(
              parseInt(indices[indices.length - 1] + 1)
            );
            setActiveElement(element);
          }
        }}
      >
        Add Input
      </Button>
      <Button
        disabled={!activeNode?.childrensAllowed}
        onClick={() => {
          const _id = crypto.randomUUID();
          if (id) {
            const e = getElement(id, elements);
            const element = new TreeNode("Button", _id, false);
            addElement(id, element);
            const indices = e.index.split(".");
            indices[indices.length - 1] = String(
              parseInt(indices[indices.length - 1] + 1)
            );
            setActiveElement(element);
          }
        }}
      >
        Add Button
      </Button>
      <Button
        disabled={!activeNode?.childrensAllowed}
        onClick={() => {
          const _id = crypto.randomUUID();
          if (id) {
            const e = getElement(id, elements);
            const element = new TreeNode("View", _id, true);
            addElement(id, element);
            const indices = e.index.split(".");
            indices[indices.length - 1] = String(
              parseInt(indices[indices.length - 1] + 1)
            );
            setActiveElement(element);
          }
        }}
      >
        Add View
      </Button>
      <Button
        className="mt-auto"
        onClick={() => {
          formatCode(`return (${generateReactNativeTree(elements)[0]})`).then(
            (v) => {
              const params = new URLSearchParams();
              params.set("code", v as string);
              push(`/output?${params.toString()}`);
            }
          );
        }}
      >
        Gimme the Code
      </Button>
    </aside>
  );
}
