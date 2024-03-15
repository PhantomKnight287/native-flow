import { PropsWithChildren } from "react";
import "@/style/devices.min.css";

function PhonePreview({ children }: PropsWithChildren) {
  return (
    <div className="">
      <div className="marvel-device iphone-x">
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="bottom-bar"></div>
        <div className="volume"></div>
        <div className="overflow">
          <div className="shadow shadow--tr"></div>
          <div className="shadow shadow--tl"></div>
          <div className="shadow shadow--br"></div>
          <div className="shadow shadow--bl"></div>
        </div>
        <div className="inner-shadow"></div>
        <div className="screen relative p-2 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export default PhonePreview;
