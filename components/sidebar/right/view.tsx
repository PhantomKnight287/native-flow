import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useActiveTreeNode from "@/hooks/use-active-element";
import { useActiveElement } from "@/state/active-element";
import { useElementsTree } from "@/state/element-tree";
import { TreeNode } from "@/structs/tree";
import { debounce } from "lodash";
import { useMemo } from "react";

function ViewProperties() {
  const { id, setActiveElement } = useActiveElement();
  const activeNode = useActiveTreeNode();
  const { elements, addElement, updateElement } = useElementsTree();
  const updateElementDebounced = useMemo(
    () => debounce(updateElement, 300),
    []
  );

  if (id === undefined || id === null || !activeNode) return null;
  return (
    <div className="space-y-4">
      <div>
        <Button
          onClick={() => {
            const _id = crypto.randomUUID();
            const newNode = new TreeNode("Button", _id, false);
            addElement(id, newNode);
            setActiveElement(newNode);
          }}
        >
          Add Button
        </Button>
      </div>
      <div>
        <div className="text-lg">ClassNames</div>
        <Input
          onChange={(e) => {
            updateElementDebounced(id!, { className: e.target.value });
          }}
          placeholder="Tailwind classes"
          defaultValue={activeNode?.properties.className}
        />
      </div>
    </div>
  );
}

export default ViewProperties;
