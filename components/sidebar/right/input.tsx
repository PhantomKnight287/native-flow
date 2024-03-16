import { Input, InputProps } from "@/components/ui/input";
import { useActiveElement } from "@/state/active-element";
import { useElements } from "@/state/elements";
import { debounce } from "lodash";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { findElementByKey } from "@/lib/element";
import { useElementsTree } from "@/state/element-tree";
import useActiveTreeNode from "@/hooks/use-active-element";

function InputProperties() {
  const { id } = useActiveElement();
  const { updateElement } = useElementsTree();
  const debouncedUpdateElement = useMemo(
    () => debounce(updateElement, 300),
    []
  );
  const activeNode = useActiveTreeNode();
  return (
    <div className="space-y-4">
      {/* <div>
        <div className="text-base">Label</div>
        <Input
          onChange={(e) => {
            const labelId = crypto.randomUUID();
            debouncedUpdateElement(
              id!,
              { id: element?.props.id || labelId },
              { label: e.target.value },
              undefined,
              {
                label: {
                  value: e.target.value,
                  htmlFor: element?.specialFields?.label?.htmlFor || labelId,
                },
              }
            );
          }}
          defaultValue={activeNode?.properties.label}
        />
      </div> */}
      <div>
        <div className="text-base">Placeholder</div>
        <Input
          onChange={(e) => {
            debouncedUpdateElement(id!, {
              placeholder: e.target.value,
            });
          }}
          defaultValue={activeNode?.properties.placeholder?.toString()}
        />
      </div>

      <div>
        <div className="text-base items-center flex gap-1">
          Input ClassNames
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <CircleHelp size={18} className="text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              Tailwind Classes, separated by space
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          onChange={(e) => {
            debouncedUpdateElement(id!, {
              className: e.target.value,
            });
          }}
          defaultValue={activeNode?.properties?.className}
        />
      </div>
    </div>
  );
}

export default InputProperties;
1;
