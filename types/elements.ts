import { ElementTypes } from "@/types/rxjs-event";
import { ElementProps } from "@/types/props";

export interface Element {
  /**
   * The Type of component
   */
  element: ElementTypes;
  /**
   * The position of the element in preview(can be used in emitted code)
   */
  position: { x: number; y: number };
  /**
   * A unique id for the element(to escape the key prop error)
   */
  key: string;
  /**
   * These props will be used to update the component shown in preview
   */
  props: ElementProps;
  /**
   * These props will be passed as is to the Native components either from `react-native` or `nativecn`
   */
  nativeProps?: Record<string, any>;
  /**
   * Special fields, this will be used to render Label for input for example.
   */
  specialFields?: Record<string, any>;
}
