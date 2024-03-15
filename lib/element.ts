import { Element } from "@/types/elements";

export function findElementByKey(
  elements: Element[],
  key: string
): Element | null {
  // Iterate through each element in the array
  for (const element of elements) {
    // Check if the current element matches the key
    if (element.key === key) {
      // If it matches, return the element
      return element;
    }
    // If the current element has children, recursively search through them
    if (element.children && element.children.length > 0) {
      const foundInChildren = findElementByKey(element.children, key);
      // If the element is found in the children, return it
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  // If the element is not found, return null
  return null;
}
