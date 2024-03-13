import { Input } from "@/components/ui/input";
import { useActiveElement } from "@/state/active-element";
import { useElements } from "@/state/elements";
import debounce from "lodash/debounce";
import { ChangeEvent, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { useTree } from "@/state/tree";

function ButtonProperties() {
  const { props, id } = useActiveElement();
  const { updateElement, elements } = useElements();
  const elementIndex = elements.map((e) => e.key).indexOf(id || "");
  const { updateElement: updateTreeElement } = useTree();

  const debouncedUpdateElement = useMemo(
    () => debounce(updateElement, 300),
    []
  );
  const debouncedUpdateTreeElement = useMemo(
    () => debounce(updateTreeElement, 300),
    []
  );
  if (elementIndex < 0) return null;
  const element = elements[elementIndex]!;
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedUpdateElement(
      elementIndex,
      {
        ...props,
        children: e.target.value,
      },
      {
        label: e.target.value,
      }
    );
    debouncedUpdateTreeElement(id!, "", { label: e.target.value });
  }

  return (
    <div className="space-y-4">
      <div className="">
        <div className="text-lg">Label</div>
        <Input
          onChange={handleInputChange}
          defaultValue={element.props.children?.toString()}
        />
      </div>
      <div>
        <div className="text-lg">Variant</div>
        <Select
          defaultValue={
            ((element.props as ButtonProps).variant as string) || "default"
          }
          onValueChange={(v) => {
            debouncedUpdateElement(
              elementIndex,
              { variant: v as VariantProps<typeof buttonVariants>["variant"] },
              { variant: v }
            );
            debouncedUpdateTreeElement(id!, "", { variant: v });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="destructive">Destructive</SelectItem>
            <SelectItem value="ghost">Ghost</SelectItem>
            <SelectItem value="link">Link</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default ButtonProperties;
