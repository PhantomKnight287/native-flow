import LeftSidebar from "@/components/sidebar/left";
import RightSidebar from "@/components/sidebar/right";
import { PropsWithChildren } from "react";
import { ComponentsSidebar } from "./_components/tree";

export default function PlaygroundLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row flex-nowrap">
      <LeftSidebar />
      <ComponentsSidebar />
      <div className={"flex-1"}>{children}</div>
      <RightSidebar />
    </div>
  );
}
