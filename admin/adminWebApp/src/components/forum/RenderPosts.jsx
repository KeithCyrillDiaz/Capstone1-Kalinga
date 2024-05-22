import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ForumModal } from "../../modal/forum/ForumModal";
import { approvedPost, deletePost } from "../../api/Forum/forum";

export const RenderPosts = ({ data }) => {
  console.log("Data: ", data);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  const updatePost = async () => {
    try {
      console.log("updating post");
      if (status === "approved") await approvedPost(id);
      else await deletePost(id);
    } catch (error) {
      console.log("Error updating status Posts", error);
    }
  };
  return (
    <>
      {modal && (
        <ForumModal
          status={status}
          updateStatus={() => updatePost()}
          onClose={() => setModal(false)}
        />
      )}

      {data.length === 0 && <div> No Forum post at this Moment </div>}
      {data.length !== 0 &&
        data.map((post, index) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl flex items-center border border-primary-default py-2"
          >
            <div className="ml-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                className="text-primary-default"
              >
                <g fill="none" fillRule="evenodd">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"
                  />
                </g>
              </svg>
            </div>
            {/* Details */}
            <div className="flex-grow ml-8">
              <div>
                <h3>{`Post ${index + 1}`}</h3>
                <p>
                  {" "}
                  <strong>Content: </strong>
                  {post.content}
                </p>
                <p>
                  <strong>Author:</strong>{" "}
                  {post.DonorOwnerID && post.DonorOwnerID.fullName
                    ? post.DonorOwnerID.fullName
                    : post.RequestorOwnerID && post.RequestorOwnerID.fullName}
                </p>
                <p>
                  {" "}
                  <strong>Status: </strong>
                  {post.status}
                </p>
              </div>
            </div>
            {/* Button */}
            <div className="flex flex-col gap-y-2 mr-14 p-2">
              <button
                onClick={() => {
                  setStatus("approved");
                  setId(post.post_ID);
                  setModal(true);
                }}
                className="w-full h-8 px-12 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  setStatus("reject");
                  setId(post.post_ID);
                  setModal(true);
                }}
                className="w-full h-8 px-12 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
