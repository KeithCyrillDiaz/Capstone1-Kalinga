import React from "react";
import QrCode from "@assets/qrCode.png";

export default function () {
  return (
    <>
      <div className="grid items-center justify-center z-[1000] min-h-screen w-full body-color">
        <div>
          <p className="pb-4 font-semibold text-center md:text-3xl sm:text-2xl xs:text-xl text-primary-default">
            This website suited only for desktop devices
          </p>
        </div>
      </div>
    </>
  );
}
