import { TreeNode } from "@/structs/tree";

export function generateReactNativeTree(treeNodes: TreeNode[]): string[] {
  return treeNodes.map((node) => {
    const { name, properties, children } = node;
    const propsString = Object.keys(properties)
      .map((key) => `${key}={${JSON.stringify(properties[key])}}`)
      .join(" ");

    if (children && children.length > 0) {
      const childrenString = generateReactNativeTree(children).join("\n");
      return `<${name} ${propsString}>\n${childrenString}\n</${name}>`;
    } else {
      return `<${name} ${propsString} />`;
    }
  });
}
