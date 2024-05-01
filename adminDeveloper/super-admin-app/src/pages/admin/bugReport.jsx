import React, { useState } from "react";
import Modal from "../../Modal/Modal.jsx"; // Import the Modal component


const bugReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSolved = () => {
    console.log("handleSolved called");
    setIsModalOpen(true); // Open the modal
  };


      const handleConfirm = () => {
        // Add your logic for handling the "Solved" button action here
        alert("Issue marked as resolved!");
        setIsModalOpen(false); // Close the modal
      };

      const handleCancel = () => {
        setIsModalOpen(false); // Close the modal
      };
    
  return (
    <section className="w-full min-h-screen bg-neutral-variant p-8">
      <div className="flex flex-col mb-8">
        <label htmlFor="topic" className="text-pink-600 text-3xl mb-2">
          Topic:
        </label>
        <input type="text" id="topic" name="topic" className="input-style rounded-lg" style={{ fontSize: "16px", padding: "25px"}} />
      </div>
      <div className="flex flex-col mb-8">
        <label htmlFor="description" className="text-pink-600 text-3xl mb-2">
          Bug Description:
        </label>
        <textarea id="description" name="description" rows="4" className="input-style rounded-lg" style={{ fontSize: "16px" ,padding: "50px" }} />
      </div>
      <div className="flex flex-col mb-8">
        <label htmlFor="photo" className="text-pink-600 text-3xl mb-2">
          Photo:
        </label>
        <input type="file" id="photo" name="photo" accept="image/*" className="input-style rounded-lg" style={{ fontSize: "16px" }} />
      </div>
      <button
        onClick={handleSolved}
        className="fixed bottom-20 right-20 px-10 py-4 text-lg font-medium text-white bg-pink-600 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Solved
      </button>

      <Modal
        isOpen={isModalOpen}
        message="Are you sure this bug has already been resolved?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </section>
  );
};

export default bugReport;