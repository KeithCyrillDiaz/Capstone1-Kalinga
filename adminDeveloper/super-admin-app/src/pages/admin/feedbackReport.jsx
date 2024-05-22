import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../../MyConstantSuperAdmin";
import { useParams } from "react-router-dom"; // Import useParams if you are using React Router

const FeedbackReport = () => {
  const { feedBack_ID } = useParams(); // Use useParams to get feedBack_ID from the URL
  const [feedbackData, setFeedbackData] = useState(null); // State to store feedback data
  const [rating, setRating] = useState(0); // State to track the selected star rating
  const [feedback, setFeedback] = useState(""); // State to track the feedback text

  // Function to handle rating selection
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  // Function to handle feedback input
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  // Function to fetch feedback data
  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get(`${WebHost}/kalinga/getFeedbackByFeedbackID/${feedBack_ID}`);
      console.log("Feedback Report Data:", response.data); // Log feedback report data
      setFeedbackData(response.data); // Set feedback report data to state
      setRating(response.data.stars); // Set initial rating
      setFeedback(response.data.content); // Set initial feedback
      console.log("Content:", response.data.content); // Log the content value
    } catch (error) {
      console.error("Error fetching feedback report data:", error);
      // Handle error or display error message
    }
  };

  useEffect(() => {
    // Fetch feedback data initially
    if (feedBack_ID) {
      fetchFeedbackData();
    }
  }, [feedBack_ID]);

  return (
    <section className="w-full min-h-screen bg-neutral-variant p-8">
      <h1 className="text-pink-500 text-4xl font-bold text-center mb-8">
        We would like your feedback to improve our app.
      </h1>

      <h1 className="text-pink-500 text-3xl font-bold text-left mb-8 mt-20">
        App Rating
      </h1>
      <div className="flex items-center justify-start ml-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 cursor-pointer ${
              star <= (feedbackData ? feedbackData.stars : rating) ? "text-pink-500" : "text-gray-400"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => handleRating(star)}
          >
            <path
              fillRule="evenodd"
              d="M10 0l2.246 6.89h7.254l-5.875 4.276 2.245 6.891L10 13.782l-6.87 4.275 2.245-6.89L0 6.89h7.254L10 0z"
              clipRule="evenodd"
            />
          </svg>
        ))}
        {/* Display the selected star rating */}
        <span className="ml-2 text-lg text-pink-500">{feedbackData ? feedbackData.stars : rating} stars</span>
      </div>

      <h1 className="text-pink-500 text-lg font-bold text-left mb-8 mt-20">
        Please leave your feedback below:
      </h1>
      <div className="w-full h-60 border border-pink-500 rounded-lg p-4 text-lg bg-white">
        {feedbackData ? feedbackData.content : feedback}
      </div>
    </section>
  );
};

export default FeedbackReport;
