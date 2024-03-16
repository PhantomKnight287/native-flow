import { TreeNode } from "@/structs/tree";

const specialRules = {
  Button: {
    children: "label",
  },
};

export function generateReactNativeTree(treeNodes: TreeNode[]): string[] {
  return treeNodes.map((node) => {
    const { name, properties, children } = node;
    const propsString = Object.keys(properties)
      .map((key) => {
        if (specialRules[node.name as keyof typeof specialRules]) {
          return `${
            specialRules[node.name as keyof typeof specialRules][
              key as keyof (typeof specialRules)["Button"]
            ] ?? key
          }={${JSON.stringify(properties[key])}}`;
        }
        return `${key}={${JSON.stringify(properties[key])}}`;
      })
      .join(" ");

    if (children && children.length > 0) {
      const childrenString = generateReactNativeTree(children).join("\n");
      return `<${name} ${propsString}>\n${childrenString}\n</${name}>`;
    } else {
      return `<${name} ${propsString} />`;
    }
  });
}
