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

function InputProperties() {
  const { props, id } = useActiveElement();
  const { updateElement, elements } = useElements();
  const elementIndex = elements.map((e) => e.key).indexOf(id || "");
  const debouncedUpdateElement = useMemo(
    () => debounce(updateElement, 300),
    []
  );
  if (elementIndex < 0) return null;
  const element = elements[elementIndex]!;
  return (
    <div className="space-y-4">
      <div>
        <div className="text-base">Label</div>
        <Input
          onChange={(e) => {
            const labelId = crypto.randomUUID();
            debouncedUpdateElement(
              elementIndex,
              { id: element.props.id || labelId },
              { label: e.target.value },
              undefined,
              {
                label: {
                  value: e.target.value,
                  htmlFor: element.specialFields?.label?.htmlFor || labelId,
                },
              }
            );
          }}
          defaultValue={element.nativeProps?.label}
        />
      </div>
      <div>
        <div className="text-base">Placeholder</div>
        <Input
          onChange={(e) => {
            debouncedUpdateElement(
              elementIndex,
              { placeholder: e.target.value, id: element.props.id },
              { placeholder: e.target.value },
              undefined
            );
          }}
          defaultValue={(element.props as InputProps).placeholder?.toString()}
        />
      </div>
      <div>
        <div className="text-base items-center flex gap-1">
          Label ClassNames
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
            debouncedUpdateElement(
              elementIndex,
              undefined,
              { labelClasses: e.target.value },
              undefined,
              {
                label: {
                  ...element.specialFields?.label,
                  className: e.target.value,
                },
              }
            );
          }}
          defaultValue={element.nativeProps?.labelClasses}
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
            debouncedUpdateElement(
              elementIndex,
              { className: e.target.value },
              undefined
            );
          }}
          defaultValue={element.props.className}
        />
      </div>
    </div>
  );
}

export default InputProperties;
1;
