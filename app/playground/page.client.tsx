"use client";

import Draggable from "react-draggable";
import { Element } from "@/types/elements";
import { ElementTypes } from "@/types/rxjs-event";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useElements } from "@/state/elements";
import { useActiveElement } from "@/state/active-element";
import PhonePreview from "./_components/preview/phone";
import View from "@/components/polyfills/View";
import { useMemo } from "react";
import { debounce } from "lodash";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function DraggablePlayground() {
  const { elements } = useElements();

  return (
    <div
      className={"w-full h-screen flex flex-col items-center justify-center"}
    >
      <PhonePreview>
        {elements.map((element) => (
          <RenderElement key={element.key} element={element} />
        ))}
      </PhonePreview>
    </div>
  );
}

export function RenderElement({ element }: { element: Element }) {
  let Child: any = null;
  switch (element.element) {
    case ElementTypes.Button:
      Child = Button;
      break;
    case ElementTypes.Input:
      Child = Input;
      break;
    case ElementTypes.View:
      Child = View;
      break;
  }

  const { setActiveElement } = useActiveElement();
  const { elements, updateElement } = useElements();
  const elementIndex = useMemo(
    () => elements.map((e) => e.key).indexOf(element.key || ""),
    [element.key]
  );

  const debouncedUpdateElement = useMemo(
    () => debounce(updateElement, 300),
    []
  );
  function updatePosition(e: Element["position"]) {
    debouncedUpdateElement(elementIndex, undefined, undefined, e);
  }

  return (
    <Draggable
      axis="both"
      defaultPosition={{ x: 0, y: 0 }}
      scale={1}
      defaultClassName={
        "min-w-fit hover:outline hover:outline-1 outline-pink-500"
      }
      onMouseDown={() =>
        setActiveElement(element.element, element.props, element.key)
      }
      bounds={"parent"}
      onDrag={(e, data) => {
        updatePosition({ x: data.x, y: data.y });
      }}
    >
      <div className="flex-1">
        {element.element === ElementTypes.Input &&
        element.specialFields?.label?.value ? (
          <Label
            htmlFor={element.specialFields?.label?.htmlFor}
            className={cn(element.nativeProps?.labelClasses || "")}
          >
            {element.specialFields?.label?.value}
          </Label>
        ) : null}
        <Child {...element.props} />
      </div>
    </Draggable>
  );
}
