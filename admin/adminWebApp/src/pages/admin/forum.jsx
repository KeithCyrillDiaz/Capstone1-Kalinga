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
      <section className="w-full min-h-screen bg-neutral-variant">
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
        <div className="flex flex-row items-center justify-center px-8 py-6 2xl:gap-x-24 xl:gap-x-16 lg:gap-x-8">
          <button
            onClick={handleForum}
            className="px-10 py-2 text-2xl font-medium text-white rounded-lg bg-primary-default"
          >
            Pending
          </button>
          <button
            onClick={handleApproved}
            className="px-10 py-2 text-2xl font-medium border rounded-lg text-primary-default border-primary-default"
          >
            Approved
          </button>
          <button
            onClick={handleRejected}
            className="px-10 py-2 text-2xl font-medium border rounded-lg text-primary-default border-primary-default"
          >
            Rejected
          </button>
        </div>
        <div className="grid grid-flow-row-dense xl:p-8 lg:py-8 lg:px-5 gap-y-6">
          <div className="px-4 py-2 bg-white border border-primary-default rounded-2xl">
            <h1 className="text-xl font-semibold text-primary-default">
              Beverly Somodio
            </h1>
            <div className="flex flex-row items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#E60965"
                  d="m9.023 21.23l-1.67-2.815l-3.176-.684l.311-3.277L2.346 12l2.142-2.454l-.311-3.277l3.177-.684l1.67-2.816L12 4.027l2.977-1.258l1.67 2.816l3.176.684l-.311 3.277L21.654 12l-2.142 2.454l.311 3.277l-3.177.684l-1.67 2.816L12 19.973zm.427-1.28L12 18.888l2.562 1.062L16 17.55l2.75-.612l-.25-2.838l1.85-2.1l-1.85-2.112l.25-2.838l-2.75-.6l-1.45-2.4L12 5.112L9.438 4.05L8 6.45l-2.75.6l.25 2.838L3.65 12l1.85 2.1l-.25 2.85l2.75.6zm1.5-5.092L15.908 9.9l-.708-.72l-4.25 4.25l-2.15-2.138l-.708.708z"
                />
              </svg>
              <p className="text-lg text-primary-default">Donor</p>
            </div>
            <div className="grid xl:grid-cols-[75%_auto] lg:grid-cols-[70%_auto] gap-x-6 py-2">
              <div className="text-xl text-justify text-primary-default">
                After my own journey with breastfeeding and experiencing the
                joys and challenges firsthand, I've come to appreciate the
                importance of community support. My little one has been
                thriving, and I'm grateful for my abundant milk supply.
              </div>
              <div className="flex flex-col items-center justify-center gap-y-6">
                <button className="px-10 py-3 text-lg text-white rounded-2xl bg-primary-default">
                  Approve
                </button>
                <button className="px-[3.15rem] py-3 text-lg text-primary-default rounded-2xl border border-primary-default font-semibold">
                  Reject
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 bg-white border border-primary-default rounded-2xl">
            <h1 className="text-xl font-semibold text-primary-default">
              Rogine Cubelo
            </h1>
            <div className="flex flex-row items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#E60965"
                  d="m9.023 21.23l-1.67-2.815l-3.176-.684l.311-3.277L2.346 12l2.142-2.454l-.311-3.277l3.177-.684l1.67-2.816L12 4.027l2.977-1.258l1.67 2.816l3.176.684l-.311 3.277L21.654 12l-2.142 2.454l.311 3.277l-3.177.684l-1.67 2.816L12 19.973zm.427-1.28L12 18.888l2.562 1.062L16 17.55l2.75-.612l-.25-2.838l1.85-2.1l-1.85-2.112l.25-2.838l-2.75-.6l-1.45-2.4L12 5.112L9.438 4.05L8 6.45l-2.75.6l.25 2.838L3.65 12l1.85 2.1l-.25 2.85l2.75.6zm1.5-5.092L15.908 9.9l-.708-.72l-4.25 4.25l-2.15-2.138l-.708.708z"
                />
              </svg>
              <p className="text-lg text-primary-default">Requestor</p>
            </div>
            <div className="grid grid-cols-[75%_auto] gap-x-6 py-2">
              <div className="text-xl text-justify text-primary-default">
                Selling expired breast milk. It's still good for babies!
              </div>
              <div className="flex flex-col items-center justify-center gap-y-6">
                <button className="px-10 py-3 text-lg font-semibold border text-primary-default rounded-2xl border-primary-default">
                  Approve
                </button>
                <button className="px-[3.15rem] py-3 text-lg text-white rounded-2xl bg-primary-default">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
