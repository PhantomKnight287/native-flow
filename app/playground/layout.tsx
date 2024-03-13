import LeftSidebar from "@/components/sidebar/left";
import RightSidebar from "@/components/sidebar/right";
import { PropsWithChildren } from "react";

export default function PlaygroundLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row flex-nowrap">
      <LeftSidebar />
      <div className={"flex-1"}>{children}</div>
      <RightSidebar />
    </div>
  );
}
