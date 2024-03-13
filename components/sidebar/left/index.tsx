"use client";

import { Button } from "@/components/ui/button";

import { useElements } from "@/state/elements";
import { ElementTypes } from "@/types/rxjs-event";
import { useActiveElement } from "@/state/active-element";
import { useTree } from "@/state/tree";

export default function LeftSidebar() {
  const { addElement } = useElements();
  const { setActiveElement } = useActiveElement();
  const { addNode } = useTree();
  return (
    <aside className={"bg-gray-700 h-screen mr-4 p-2 flex flex-col gap-2 z-20"}>
      <Button
        onClick={() => {
          const id = crypto.randomUUID();
          addElement({
            element: ElementTypes.Input,
            key: id,
            position: { x: 0, y: 0 },
            props: {},
          });
          setActiveElement(ElementTypes.Input, {}, id);
          addNode(`<Input data-testid="${id}"></Input>`);
        }}
      >
        Add Input
      </Button>
      <Button
        onClick={() => {
          const id = crypto.randomUUID();
          addElement({
            element: ElementTypes.Button,
            key: id,
            position: { x: 0, y: 0 },
            props: {},
          });
          setActiveElement(ElementTypes.Button, {}, id);
          addNode(`<Button data-testid="${id}"></Button>`);
        }}
      >
        Add Button
      </Button>
      <Button
        onClick={() => {
          const id = crypto.randomUUID();
          addElement({
            element: ElementTypes.View,
            key: id,
            position: { x: 0, y: 0 },
            props: {},
          });
          setActiveElement(ElementTypes.View, {}, id);
          addNode(`<View data-testid="${id}"></View>`);
        }}
      >
        Add View
      </Button>
    </aside>
  );
}
