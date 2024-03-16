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
import useActiveTreeNode from "@/hooks/use-active-element";
import { useElementsTree } from "@/state/element-tree";

function ButtonProperties() {
  const { id,  setActiveElement } = useActiveElement();
  const activeElement = useActiveTreeNode();
  const { addElement, elements, updateElement } = useElementsTree();

  const debouncedUpdateElement = useMemo(
    () => debounce(updateElement, 300),
    []
  );
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedUpdateElement(id!, { children: e.target.value });
  }

  return (
    <div className="space-y-4">
      <div className="">
        <div className="text-lg">Label</div>
        <Input
          onChange={handleInputChange}
          defaultValue={activeElement?.properties.children?.toString()}
        />
      </div>
      <div>
        <div className="text-lg">Variant</div>
        <Select
          defaultValue={activeElement?.properties?.variant}
          onValueChange={(v) => {
            debouncedUpdateElement(id!, {
              variant: v,
            });
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
