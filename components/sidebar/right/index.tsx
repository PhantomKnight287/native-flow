"use client";

import { useActiveElement } from "@/state/active-element";
import { useElements } from "@/state/elements";
import ButtonProperties from "./button";
import InputProperties from "./input";
import { useTree } from "@/state/tree";
import { Button } from "@/components/ui/button";
import ViewProperties from "./view";
import useActiveTreeNode from "@/hooks/use-active-element";
import { useElementsTree } from "@/state/element-tree";

const Components = {
  Button: <ButtonProperties />,
  Input: <InputProperties />,
  View: <ViewProperties />,
};

export default function RightSidebar() {
  const { id } = useActiveElement();

  const { removeElement } = useTree();
  const activeElement = useActiveTreeNode();
  if (!activeElement) return null;
  return (
    <aside
      className={"bg-gray-700 h-screen p-2 flex flex-col gap-2 z-20"}
      key={id}
    >
      {Components[activeElement.name as unknown as keyof typeof Components]}
      <Button
        onClick={() => {
          removeElement(id!);
        }}
        variant={"destructive"}
      >
        Remove Element
      </Button>
    </aside>
  );
}
