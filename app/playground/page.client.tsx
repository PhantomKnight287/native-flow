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
import { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { useElementsTree } from "@/state/element-tree";
import { Tree, TreeNode } from "@/structs/tree";

export default function DraggablePlayground() {
  const { elements: elementsTree, setElements } = useElementsTree();
  const { setActiveElement } = useActiveElement();
  useEffect(() => {
    if (elementsTree.length) return;
    const id = crypto.randomUUID();
    const node = new Tree("View", id, true);
    setElements([node]);
    setActiveElement(node, "-1");
  }, []);

  return (
    <div
      className={"w-full h-screen flex flex-col items-center justify-center"}
    >
      <PhonePreview>
        {elementsTree.map((element) => (
          <RenderElement key={element.id} element={element} parent />
        ))}
      </PhonePreview>
    </div>
  );
}

export function RenderElement({
  element,
  index,
  parent,
}: { element: TreeNode } & (
  | { parent?: boolean; index: string }
  | { parent: boolean; index?: string }
)) {
  let Child: any = null;
  switch (element.name) {
    case "View":
      Child = View;
      break;
    case "Input":
      Child = Input;
      break;

    case "Button":
      Child = Button;
      break;
  }

  const { setActiveElement } = useActiveElement();
  return (
    <>
      <Draggable
        axis="both"
        defaultPosition={{ x: 0, y: 0 }}
        scale={1}
        defaultClassName={cn(
          "min-w-fit hover:outline hover:outline-1 outline-pink-500",
          {
            "h-full": element.name === "View" && parent,
          }
        )}
        onMouseDown={() =>
          setActiveElement(element, parent ? "-1" : index || "0")
        }
        bounds={"parent"}
      >
        <div className="flex-1" data-identifier={element.id}>
          {Child === null ? null : (
            <>
              {!element.childrensAllowed ? (
                <Child
                  {...element.properties}
                  className={cn(
                    {
                      "h-full flex-1":
                        parent ||
                        (element.name === "View" &&
                          element.children.length === 0),
                    },
                    element.properties.className
                  )}
                />
              ) : (
                <Child
                  {...element.properties}
                  className={cn(
                    {
                      "h-full flex-1":
                        parent ||
                        (element.name === "View" &&
                          element.children.length === 0),
                    },
                    element.properties.className
                  )}
                >
                  {element.children.map((child, _index) => (
                    <RenderElement
                      element={child}
                      key={child.id}
                      index={parent ? `0.${_index}` : `${index}.${_index}`}
                    />
                  ))}
                </Child>
              )}
            </>
          )}
        </div>
      </Draggable>
    </>
  );
}
