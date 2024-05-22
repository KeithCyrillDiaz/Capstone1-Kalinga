import React, { useState } from "react";


const bugResolve = () => {
  
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
     
    </section>
  );
};

export default bugResolve;