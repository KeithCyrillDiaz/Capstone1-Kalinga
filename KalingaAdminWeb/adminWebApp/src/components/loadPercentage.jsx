import React, { useState, useEffect } from "react";

export default function ({ name }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 90 ? prevProgress + 1 : prevProgress
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center py-3 xl:flex-col lg:gap-x-6 xl:gap-x-0">
        <div className="relative">
          <svg
            className="w-[95%] h-[95%]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="10" stroke="#FFD1D7" strokeWidth="4" />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#E60965"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="calc(2 * 3.1416 * 10)"
              strokeDashoffset={`calc(2 * 3.1416 * 10 * (1 - ${
                progress / 100
              }))`}
              transform="rotate(-90, 12, 12)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[4rem] font-semibold text-primary-default">
            {progress}%
          </div>
        </div>
        <h1 className="py-2 text-3xl text-primary-default">{name}</h1>
      </div>
    </>
  );
}
