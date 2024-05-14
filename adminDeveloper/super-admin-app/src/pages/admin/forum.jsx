import React from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const handleForum = () => {
    navigate("/admin/forum");
  };

  const handleApproved = () => {
    navigate("/admin/approved");
  };

  const handleRejected = () => {
    navigate("/admin/rejected");
  };

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="grid items-center justify-center grid-cols-[auto_1fr] gap-x-10 py-12 px-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="55"
            viewBox="0 0 24 24"
          >
            <path
              fill="#E60965"
              d="M7 18q-.425 0-.712-.288T6 17v-2h13V6h2q.425 0 .713.288T22 7v15l-4-4zm-5-1V3q0-.425.288-.712T3 2h13q.425 0 .713.288T17 3v9q0 .425-.288.713T16 13H6zm13-6V4H4v7zM4 11V4z"
            />
          </svg>
          <h1 className="text-5xl text-primary-default">Forum Moderation</h1>
        </div>
        <hr className="border-t-2 border-primary-default" />
        <div className="grid grid-flow-row-dense xl:p-8 lg:py-8 lg:px-5 gap-y-6">
          <div className="px-4 py-2 bg-white border border-primary-default rounded-2xl">
            <div className="grid xl:grid-cols-[75%_auto] lg:grid-cols-[70%_auto] gap-x-6 py-4 items-center justify-center">
              <div className="text-3xl text-justify text-primary-default ">
                Sorry, this feature is not yet available right now. Rest
                assured, our team is hard at work developing new features to
                better serve our community. Your continued support means the
                world to us. Thank you for your patience!
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
