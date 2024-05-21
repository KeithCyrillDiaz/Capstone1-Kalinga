import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { WebHost } from "../../../MyConstantSuperAdmin";


const Feedback = () => {
  const [donorFeedback, setDonorFeedback] = useState([]);
  const [requestorFeedback, setRequestorFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Donor");

  useEffect(() => {
    fetchFeedbackData();
  }, [activeTab]);

  const fetchFeedbackData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(`${WebHost}/kalinga/getFeedbackByUserType/${activeTab}`);
      console.log("Active Tab:", activeTab); // Log activeTab value
      console.log("API Response:", response.data); // Log API response
  
      if (response.data.messages.code === 0) {
        const allFeedback = response.data.result;
        if (activeTab === "Donor") {
          setDonorFeedback(allFeedback.filter((feedback) => feedback.userType === "Donor"));
        } else {
          setRequestorFeedback(allFeedback.filter((feedback) => feedback.userType === "Requestor"));
        }
      } else {
        setError("Failed to fetch feedback data");
      }
    } catch (error) {
      console.error("Error fetching feedback data:", error);
      setError("Error fetching feedback data");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="w-full min-h-screen bg-neutral-variant p-8">
    <div className="flex justify-center mb-8">
      <button
        onClick={() => handleTabChange("Donor")}
        className={`px-24 py-3 text-lg font-medium ${
          activeTab === "Donor"
            ? "bg-pink-500 text-white rounded-tl-lg rounded-bl-lg"
            : "text-red-500 bg-white border border-red-500"
        } focus:outline-none focus:ring-2 focus:ring-red-500`}
      >
        Donor Feedback
      </button>
      <button
        onClick={() => handleTabChange("Requestor")}
        className={`px-24 py-3 text-lg font-medium ${
          activeTab === "Requestor"
            ? "bg-pink-500 text-white rounded-tr-lg rounded-br-lg"
            : "text-red-500 bg-white border border-red-500"
        } focus:outline-none focus:ring-2 focus:ring-red-500`}
      >
        Requestor Feedback
      </button>
    </div>
      {activeTab === "Donor" && (
          <div>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Donor Feedback</h2>
            {loading ? (
              <p>Loading donor feedback...</p>
            ) : donorFeedback.length > 0 ? (
              donorFeedback.map((feedback) => (
                <div key={feedback.feedBack_ID} className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-red-500 mb-2">{feedback.name}</h3>
                    <p className="text-lg text-gray-600">{feedback.userType}</p>
                    <p className="text-lg text-gray-600">{feedback.content}</p>
                    <p className="text-lg text-gray-600">{new Date(feedback.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <Link to={`/admin/feedbackReport/${feedback.feedBack_ID}`}>
                      <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500">
                        Review
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No donor feedback available.</p>
            )}
          </div>
        )}

        {activeTab === "Requestor" && (
          <div>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Requestor Feedback</h2>
            {loading ? (
              <p>Loading requestor feedback...</p>
            ) : requestorFeedback.length > 0 ? (
              requestorFeedback.map((feedback) => (
                <div key={feedback.feedBack_ID} className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-red-500 mb-2">{feedback.name}</h3>
                    <p className="text-lg text-gray-600">{feedback.userType}</p>
                    <p className="text-lg text-gray-600">{feedback.content}</p>
                    <p className="text-lg text-gray-600">{new Date(feedback.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <Link to={`/admin/feedbackReport/${feedback.feedBack_ID}`}>
                      <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500">
                        Review
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No requestor feedback available.</p>
            )}
          </div>
        )}
    </section>
  );
};

export default Feedback;