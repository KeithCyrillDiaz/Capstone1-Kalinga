import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPost } from "../../api/Forum/forum";
import { RenderPosts } from "../../components/forum/RenderPosts";

export default function () {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const handleForum = () => {
    navigate("/admin/forum");
  };

  const handleApproved = () => {
    navigate("/admin/approved");
  };

  const handleRejected = () => {
    navigate("/admin/rejected");
  };

  const fetchPosts = async () => {
    const response = await fetchAllPost();
    if (response) setPosts(response);
    else console.log("Error Fetching Posts");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden relative px-4">
        <div className="p-12 pt-1">
          <h1 className="mt-8 text-3xl text-primary-default font-bold font-sans">
            Appointment Confirmation
          </h1>

          <div className="grid grid-flow-row-dense xl:p-8 lg:py-8 lg:px-5 gap-y-6">
            <RenderPosts data={posts} />
            {/* <div className="px-4 py-2 bg-white border border-primary-default rounded-2xl">
              <div className="grid xl:grid-cols-[75%_auto] lg:grid-cols-[70%_auto] gap-x-6 py-4 items-center justify-center">
                <div className="text-3xl text-justify text-primary-default ">
                Sorry, this feature is not yet available right now. 
                Rest assured, our team is hard at work developing new features to better serve our community. 
                Your continued support means the world to us. Thank you for your patience!
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
