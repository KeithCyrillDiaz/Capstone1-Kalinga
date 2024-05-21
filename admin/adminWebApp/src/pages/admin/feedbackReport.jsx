import React, { useState } from "react";
import Modal from "../../modal/Modal"; // Import the Modal component

const FeedbackReport = () => {
  const [rating, setRating] = useState(0); // State to track the selected rating
  const [feedback, setFeedback] = useState(""); // State to track the feedback text

  // Function to handle rating selection
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  // Function to handle feedback input
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  return (
    <section className="w-full min-h-screen bg-neutral-variant p-8">
      <h1 className="text-pink-500 text-4xl font-bold text-center mb-8">
        We would like your feedback to improve our app.
      </h1>

      <h1 className="text-pink-500 text-3xl font-bold text-left mb-8 mt-20">
        Can you rate our app?
      </h1>

      {/* Star Rating */}
      <div className="flex items-center justify-start ml-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 cursor-pointer ${
              star <= rating ? "text-pink-500" : "text-gray-400"
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
      </div>

      <h1 className="text-pink-500 text-lg font-bold text-left mb-8 mt-20">
        Please leave your feedback below:
      </h1>
      <textarea
        className="w-full h-60 border border-pink-500 rounded-lg p-4 text-lg"
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Enter your feedback here..."
      ></textarea>
    </section>
  );
};

export default FeedbackReport;
