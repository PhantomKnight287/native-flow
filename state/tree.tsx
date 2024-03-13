import { create } from "zustand";

function removeProps(startTag: string) {
  const componentNameRegex = /<\s*([^\s>]+)/;
  const componentNameMatch = componentNameRegex.exec(startTag);
  if (componentNameMatch) {
    return `${componentNameMatch[1]}`;
  }
  return startTag;
}

export interface TreeState {
  /**
   * The actual parsed tree of React Native components, without closing tag
   */
  tree: string;
  /**
   * The Last closing tag
   */
  endingNode: "</View>";
  /**
   * Add new node to tree
   */
  addNode: (e: string) => void;
  updateElement: (id: string, newData: any, newProps?: any) => void;
  removeElement: (id: string) => void;
}

export const useTree = create<TreeState>((setter) => ({
  tree: "<View>",
  endingNode: "</View>",
  addNode: (e) => setter((state) => ({ tree: state.tree + e })),
  updateElement: (id, newData, newProps) => {
    setter((state) => {
      const regex = new RegExp(
        `(<[^>]*?data-testid="${id}"[^>]*?>)([^<]*?)(<\/[^>]*?>|\/>)`,
        "g"
      );
      const updatedTree = state.tree.replace(
        regex,
        (match, startTag, content, endTag) => {
          // Update content
          const updatedContent = newData ? newData : content;

          // Parse existing props
          const existingPropsRegex = /(\S+)=["']([^"']*)["']/g;
          let existingProps = {};
          let propMatch;
          while ((propMatch = existingPropsRegex.exec(startTag)) !== null) {
            const propName = propMatch[1];
            const propValue = propMatch[2];
            //@ts-expect-error
            existingProps[propName] = propValue;
          }

          // Merge existing and new props
          const mergedProps = { ...existingProps, ...newProps };
          console.log(mergedProps);
          let updatedPropsStr = "";
          for (const propName in mergedProps) {
            updatedPropsStr += ` ${propName}="${mergedProps[propName]}"`;
          }
          return `<${removeProps(
            startTag
          )}${updatedPropsStr}>${updatedContent}${endTag}`;
        }
      );

      return { tree: updatedTree };
    });
  },
  removeElement: (id) => {
    setter((state) => {
      const regex = new RegExp(
        `<[^>]*?data-testid="${id}"[^>]*?>[^<]*?<\/[^>]*?>`,
        "g"
      );
      const updatedTree = state.tree.replace(regex, "");
      return { tree: updatedTree };
    });
  },
}));
