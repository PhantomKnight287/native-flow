import { create } from "zustand";
import { Element } from "@/types/elements";

export interface ElementsState {
  elements: Element[];
  addElement: (element: Element) => void;
  clearElements: () => void;
  updateElement: (
    index: string,
    props?: Element["props"],
    nativeProps?: Element["nativeProps"],
    position?: Element["position"],
    specialFields?: Element["specialFields"],
    childNodes?: Element["children"]
  ) => void;
  removeElement: (index: string) => void;
}
export const useElements = create<ElementsState>((setter) => ({
  elements: [],
  addElement: (element) =>
    setter((state) => ({ elements: [...state.elements, element] })),
  clearElements: () => setter(() => ({ elements: [] })),
  updateElement: (
    key,
    props,
    nativeProps,
    position,
    specialFields,
    childNodes
  ) =>
    setter((state) => {
      const updatedElements = state.elements.map((element) => {
        if (element.key === key) {
          return {
            ...element,
            props: { ...element.props, ...(props as any) },
            nativeProps: { ...element.nativeProps, ...nativeProps },
            position: position || element.position,
            specialFields: { ...element.specialFields, ...specialFields },
            children: [...(element.children || []), ...(childNodes || [])],
          };
        } else if (element.children && element.children.length > 0) {
          // If the current element has children, recursively search through them
          const updatedChildren = element.children.map((child) =>
            updateChildElement(
              child,
              key,
              props,
              nativeProps,
              position,
              specialFields,
              childNodes
            )
          );
          return { ...element, children: updatedChildren };
        } else {
          return element;
        }
      });

      return { elements: updatedElements };
    }),
  removeElement: (key) =>
    setter((state) => {
      const updatedElements = removeElementByKey(state.elements, key);
      return { elements: updatedElements };
    }),
}));

function updateChildElement(
  child: Element,
  key: string,
  props?: Element["props"],
  nativeProps?: Element["nativeProps"],
  position?: Element["position"],
  specialFields?: Element["specialFields"],
  childNodes?: Element["children"]
) {
  if (child.key === key) {
    return {
      ...child,
      props: { ...child.props, ...(props as any) },
      nativeProps: { ...child.nativeProps, ...nativeProps },
      position: position || child.position,
      specialFields: { ...child.specialFields, ...specialFields },
      children: [...(child.children || []), ...(childNodes || [])],
    };
  } else if (child.children && child.children.length > 0) {
    const updatedChildren: any = child.children.map((subChild) =>
      updateChildElement(
        subChild,
        key,
        props,
        nativeProps,
        position,
        specialFields,
        childNodes
      )
    );
    return { ...child, children: updatedChildren };
  } else {
    return child;
  }
}

function removeElementByKey(elements: Element[], key: string) {
  return elements.reduce((acc, element) => {
    if (element.key === key) {
      // If the element matches the key, skip it (effectively removing it)
      return acc;
    } else if (element.children && element.children.length > 0) {
      // If the element has children, recursively remove the element from children
      const updatedChildren = removeElementByKey(element.children, key);
      // If the children array is empty after removal, remove it from the parent element
      if (updatedChildren.length > 0) {
        //@ts-expect-error
        acc.push({ ...element, children: updatedChildren });
      }
    } else {
      // If the element doesn't match the key and has no children, keep it
      //@ts-expect-error
      acc.push(element);
    }
    return acc;
  }, []);
}
