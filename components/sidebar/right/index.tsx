"use client";

import { useActiveElement } from "@/state/active-element";
import { useElements } from "@/state/elements";
import { ElementTypes } from "@/types/rxjs-event";
import ButtonProperties from "./button";
import InputProperties from "./input";
import { useTree } from "@/state/tree";
import { Button } from "@/components/ui/button";

const Components = {
  [ElementTypes.Button]: <ButtonProperties />,
  [ElementTypes.Input]: <InputProperties />,
};

export default function RightSidebar() {
  const { type, id } = useActiveElement();
  const { elements, removeElement } = useElements();
  const { removeElement: removeTreeElement } = useTree();
  const elementIndex = elements.map((e) => e.key).indexOf(id || "");
  if (elementIndex < 0) return null;
  const element = elements[elementIndex]!;
  if (type === undefined || type === null) return null;
  return (
    <aside
      className={"bg-gray-700 h-screen p-2 flex flex-col gap-2 z-20"}
      key={id}
    >
      {/*       
       //@ts-expect-error */}
      {Components[element.element]}
      <Button
        onClick={() => {
          removeElement(elementIndex);
          removeTreeElement(id!);
        }}
        variant={"destructive"}
      >
        Remove Element
      </Button>
    </aside>
  );
}
