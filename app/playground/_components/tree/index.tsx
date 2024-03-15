"use client";
import { Button } from "@/components/ui/button";
import { useActiveElement } from "@/state/active-element";
import { useElementsTree } from "@/state/element-tree";
import { TreeNode } from "@/structs/tree";

import { Fragment } from "react";

function ComponentTree({
  elements,
  index,
  parent,
}: {
  elements: TreeNode[];
} & (
  | { parent?: boolean; index: string }
  | { parent: boolean; index?: string }
)) {
  const { setActiveElement } = useActiveElement();

  return (
    <>
      {elements.map((element, _index) => (
        <Fragment key={element.id}>
          <Button
            variant={"ghost"}
            onClick={() => {
              setActiveElement(element, parent ? "-1" : index || "0");
            }}
          >
            {element.name}{" "}
            {process.env.NODE_ENV === "development" ? `(${element.id})` : null}
          </Button>
          <ComponentTree
            elements={element.children}
            index={parent ? `0.${_index}` : `${index}.${_index}`}
          />
        </Fragment>
      ))}
    </>
  );
}

export default ComponentTree;

export function ComponentsSidebar() {
  const { elements } = useElementsTree();
  return (
    <aside
      className={"bg-gray-700 h-screen p-2 flex flex-col gap-2 z-20 space-y-2"}
    >
      <ComponentTree elements={elements} parent />
    </aside>
  );
}
