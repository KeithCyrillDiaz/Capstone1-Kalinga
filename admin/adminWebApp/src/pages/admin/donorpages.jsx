import React from "react";

const DonorPages = ({ currentPage }) => {
  // Define content for each page here
  const pageContents = {
    1: (
      <div>
        <div className="px-16 my-6 ">
          <div className="flex font-sans font-bold text-2xl text-primary-default font-sans">
            Personal Information
          </div>
          <div className="bg-white relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Full Name
          </div>
          <div className="flex gap-x-6 my-4">
            <div className="bg-white relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Age
            </div>
            <div className="bg-white relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birthdate
            </div>
          </div>
          <div className="bg-white relative border roun ded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Email Address
          </div>
          <div className="bg-white relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Phone Number
          </div>
          <div className="bg-white relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 h-24 font-sans text-primary-disabled">
            Home Address
          </div>
        </div>

        <div className="px-16 my-6 ">
          <div className="flex font-sans font-bold text-2xl text-primary-default font-sans">
            Infant Information
          </div>
          <div className="bg-white relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Name of Child
          </div>
          <div className="flex gap-x-6 my-4">
            <div className="bg-white relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Age
            </div>
            <div className="bg-white relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Sex
            </div>
          </div>
          <div className="flex gap-x-6 my-4">
            <div className="bg-white relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birthdate
            </div>
            <div className="bg-white relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birth Weight (kg)
            </div>
          </div>
          <div className="bg-white relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Age of Gestation
          </div>
        </div>
      </div>
    ),

    2: (
      <div className="px-16 my-6 ">
        <div className="font-sans text-primary-disabled my-2">
          Note: Select your answer by ticking the circle
        </div>

        <div className="bg-white relative border rounded-md border-primary-default bg-white px-2 py-2 font-sans text-primary-disabled">
          <div className="flex gap-x-20 my-6">
            <div className="flex justify-center items-center font-sans font-bold px-6 py-4">
              Type of Donor
            </div>
            <div className="justify-center items-center">
              <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
              <label
                for="myCheckbox"
                className="flex items-center cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-white border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4"></div>
                <span className="font-sans font-bold">Community</span>
              </label>
              <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
              <label
                for="myCheckbox"
                className="flex items-center cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-white border-2 border-primary-default rounded-full flex-shrink-0 mr-2"></div>
                <span className="font-sans font-bold">Private</span>
              </label>
            </div>
            <div className="justify-center items-center">
              <input
                type="checkbox"
                id="myCheckbox"
                className="hidden"
                checked
              />{" "}
              <label
                for="myCheckbox"
                className="flex items-center cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-white border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4"></div>
                <span className="font-sans font-bold">Employee</span>
              </label>
              <input
                type="checkbox"
                id="myCheckbox"
                className="hidden"
                checked
              />{" "}
              <label
                for="myCheckbox"
                className="flex items-center cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-white border-2 border-primary-default rounded-full flex-shrink-0 mr-2"></div>
                <span className="font-sans font-bold">
                  Network Office / Agency
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 h-32 font-sans text-primary-disabled">
          Bakit mo gusto magbigay ng iyong gatas/breastmilk?
        </div>
        <div className="bg-white relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 h-32 font-sans text-primary-disabled">
          Paano mo nalaman ang tungkol sa Quezon City Hospital Human Milk Bank ?
        </div>

        <div className="font-sans text-primary-disabled my-2">
          Note: Select your answer by ticking the circle
        </div>

        <div className="bg-white relative border rounded-md border-primary-default bg-white py-2 font-sans text-primary-disabled">
          <div class="flex flex-row gap-x-2 my-4">
            <div class="basis-1/12 ">
              <div className="flex justify-center font-sans text-primary-default font-bold ">
                {" "}
                Yes{" "}
              </div>
              <div className="flex justify-center">
                <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
                <label
                  for="myCheckbox"
                  className="flex items-center cursor-not-allowed"
                >
                  <div className="w-5 h-5 bg-white border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4"></div>
                </label>
              </div>
              <div className="flex justify-center">
                <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
                <label
                  for="myCheckbox"
                  className="flex items-center cursor-not-allowed"
                >
                  <div className="w-5 h-5 bg-white border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4"></div>
                </label>
              </div>
            </div>

            <div class="basis-1/12 ">
              <div className="flex justify-center font-sans text-primary-default font-bold ">
                {" "}
                No{" "}
              </div>
              <div className="flex justify-center">
                <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
                <label
                  for="myCheckbox"
                  className="flex items-center cursor-not-allowed"
                >
                  <div className="w-5 h-5 bg-white border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4"></div>
                </label>
              </div>
              <div className="flex justify-center">
                <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
                <label
                  for="myCheckbox"
                  className="flex items-center cursor-not-allowed"
                >
                  <div className="w-5 h-5 bg-white border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4"></div>
                </label>
              </div>
            </div>

            <div className="basis-3/2">
              <div className="font-sans text-xl my-8">
                Gusto mo bang magbigay ng gatas nang regular sa loob ng anim (6)
                na buwan?
              </div>
              <div className="font-sans text-xl ">
                Papayagan ka ba ng iyong asawa na magbigay ng iyong gatas sa
                Human Milk Bank?
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    3: <div>Content for Page 3</div>,
    4: <div>Content for Page 4</div>,
  };

  return pageContents[currentPage];
};

export default DonorPages;
