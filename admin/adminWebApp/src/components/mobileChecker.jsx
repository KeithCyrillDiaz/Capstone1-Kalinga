import React from "react";
import QrCode from "@assets/qrCode.png";

export default function () {
  return (
    <>
      <div className="grid items-center justify-center z-[1000] min-h-screen w-full body-color">
        <div>
          <p className="pb-4 font-semibold text-center md:text-3xl sm:text-2xl xs:text-xl text-primary-default">
            Please download our mobile app <br /> for a better experience.
          </p>
          <div className="grid items-center justify-center">
            <img src={QrCode} alt="qr code" className="w-64 h-64 rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
