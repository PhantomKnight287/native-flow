import { ComponentProps } from "react";

export default function View(props: ComponentProps<"div">) {
  return <div {...props} />;
}
