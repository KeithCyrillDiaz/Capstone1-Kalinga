import React, { useState, useEffect } from "react";
import Modal from "../../Modal/Modal.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { WebHost } from "../../../MyConstantSuperAdmin";

const BugReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bugReport, setBugReport] = useState(null);
  const { ReportBugID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBugReport();
  }, []);

  const fetchBugReport = async () => {
    try {
      const response = await axios.get(`${WebHost}/kalinga/getBugReportById/${ReportBugID}`);
      if (response.status === 200) {
        setBugReport(response.data.bugReport);
      } else {
        console.error("Failed to fetch bug report");
      }
    } catch (error) {
      console.error("Error fetching bug report:", error);
    }
  };

  const handleSolved = () => {
    setIsModalOpen(true);
  };

const handleConfirm = async () => {
  try {
    const response = await axios.patch(`${WebHost}/kalinga/updateResolved/${ReportBugID}`);

    if (response.status === 200) {
      setIsModalOpen(false); // Close the first modal
      alert("Great! The bug has been marked as resolved, and the user has already been notified."); // Show the second modal
      navigate('/admin/bugs'); // Redirect to bugs list or another page
    } else {
      console.error("Failed to update bug report");
      // Handle the case where the API request was successful but the status code is not 200
      // You can show an error message to the user or handle it based on your UI/UX flow
    }
  } catch (error) {
    console.error("Error updating bug report:", error);
    // Handle the API request failure, such as network error or server error
    // You can show an error message to the user or handle it based on your UI/UX flow
  } finally {
    setIsModalOpen(false); // Ensure the modal is closed regardless of success or failure
  }
};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="w-full min-h-screen bg-neutral-variant p-8">
      {bugReport && (
        <div>
          <div className="flex flex-col mb-8">
            <label htmlFor="topic" className="text-pink-600 text-3xl mb-2">
              Topic:
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              className="input-style rounded-lg"
              style={{ fontSize: "25px", padding: "25px" }}
              value={bugReport.topic}
              readOnly
            />
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="description" className="text-pink-600 text-3xl mb-2">
              Bug Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="input-style rounded-lg"
              style={{ fontSize: "20px", padding: "25px" }}
              value={bugReport.content}
              readOnly
            />
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="photo" className="text-pink-600 text-3xl mb-2">
              Photo: content
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="input-style rounded-lg"
              style={{ fontSize: "16px" }}
            />
          </div>
          <button
            onClick={handleSolved}
            className="fixed bottom-20 right-20 px-10 py-4 text-lg font-medium text-white bg-pink-600 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Solved
          </button>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        message="Are you sure this bug has already been resolved?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </section>
  );
};

export default BugReport;
