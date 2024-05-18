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
        <div className="p-8 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans py-4 pb-6">
              Forum Moderation
            </h1>
          </div>

          <div className="px-2 py-2 bg-white border border-primary-default rounded-2xl">
            <div className="text-2xl text-center text-primary-default px-48 py-4">
              Sorry, this feature is not yet available right now. Rest assured,
              our team is hard at work developing new features to better serve
              our community. Your continued support means the world to us.
              <p className="mt-4">Thank you for your patience!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
