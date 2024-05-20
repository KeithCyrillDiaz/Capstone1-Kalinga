import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(""); // State to hold current time
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  useEffect(() => {
    // Function to update current time every second
    const timer = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setCurrentTime(currentTime);
    }, 1000);
    return () => clearInterval(timer); // Clear interval on component unmount
  }, []);

  const handleSignOut = () => {
    navigate("/");
  };

  const dropdownRef = useRef(null);

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-white flex justify-between items-center elevate-2 w-full pr-4">
      <div className="px-4 text-white flex items-center space-x-4 justify-end w-full">
        <div className="flex items-center rounded-md py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="mr-2"
          >
            <path
              fill="#E60965"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 12h5v5h-5zm7-9h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 2v2H5V5zM5 19V9h14v10z"
            ></path>
          </svg>
          <span className="text-primary-default">{formattedDate} |</span>
          <span className="text-primary-default">| {currentTime}</span>
        </div>

        <div className="relative inline-block text-left" ref={dropdownRef}>
          <div onClick={() => setShowDropdown(!showDropdown)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              className="cursor-pointer"
            >
              <path
                fill="#E60965"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                fillRule="evenodd"
                d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076A9.959 9.959 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.958 9.958 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22a9.947 9.947 0 0 0 5.675-1.765a10.055 10.055 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {showDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="relative flex flex-row p-2 pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  className="mr-2"
                >
                  <path
                    fill="#E60965"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    fillRule="evenodd"
                    d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076A9.959 9.959 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.958 9.958 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22a9.947 9.947 0 0 0 5.675-1.765a10.055 10.055 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="flex flex-col">
                  <span className="text-primary-default text-lg">Username</span>
                  <span className="text-primary-default text-sm italic">
                    Role - Admin
                  </span>
                </div>
              </div>

              <hr className="border-t-1 border-primary-default" />

              <div className="flex flex-row py-1">
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-4 mx-2 py-2 text-sm text-primary-default w-full rounded-lg hover:bg-primary-default hover:text-white"
                  role="menuitem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    className="mr-4 hover:fill-neutral-variant"
                  >
                    <path
                      fill="#FFE5EC"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 12a1 1 0 0 0 1 1h7.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5a1 1 0 0 0-1 1M17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3"
                    />
                  </svg>
                  <span className="text-md">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
