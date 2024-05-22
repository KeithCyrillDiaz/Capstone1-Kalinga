import React from "react";

const DonorPages = ({ currentPage, form }) => {
  const pageContents = {
    1: (
      <div>
        <div className="px-16 my-6 ">
          <div className="flex font-sans font-bold justify-center text-3xl text-primary-default">
            Initial Screening Form
          </div>
          <div className="flex font-bold text-2xl text-primary-default font-sans">
            Personal Information
          </div>
          <div className="relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Full Name: {form.fullName}
          </div>
          <div className="flex gap-x-6 my-4">
            <div className="relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Age:{form.Age}
            </div>
            <div className="relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birthdate: {form.birthDate}
            </div>
          </div>
          <div className="relative border roun ded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Email Address: {form.email}
          </div>
          <div className="relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Phone Number: {form.contactNumber}
          </div>
          <div className="relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 h-24 font-sans text-primary-disabled">
            Home Address: {form.homeAddress}
          </div>
        </div>
        <div className="px-16 my-6 ">
          <div className="flex font-bold text-2xl text-primary-default font-sans">
            Infant Information
          </div>
          <div className="relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Name of Child: {form.childName}
          </div>
          <div className="flex gap-x-6 my-4">
            <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Age: {form.childAge}
            </div>
            <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Sex: {form.sex}
            </div>
          </div>
          <div className="flex gap-x-6 my-4">
            <div className="relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birthdate: {form.childBirthDate}
            </div>
            <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birth Weight (kg): {form.birthWeight}
            </div>
          </div>
        </div>
      </div>
    ),

    2: (
      <div className="px-16 my-6 ">
        <div className="font-sans text-primary-disabled my-2">
          Note: Select your answer by ticking the circle
        </div>

        <div className="relative border rounded-md border-primary-default bg-white px-2 py-2 font-sans text-primary-disabled">
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
                <div
                  className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4 ${
                    form.typeOfDonor === "Community"
                      ? "bg-primary-default"
                      : "bg-white"
                  }`}
                ></div>
                <span className="font-sans font-bold">Community</span>
              </label>
              <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
              <label
                for="myCheckbox"
                className="flex items-center cursor-not-allowed"
              >
                <div
                  className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4 ${
                    form.typeOfDonor === "Private"
                      ? "bg-primary-default"
                      : "bg-white"
                  }`}
                ></div>
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
                <div
                  className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4 ${
                    form.typeOfDonor === "Employee"
                      ? "bg-primary-default"
                      : "bg-white"
                  }`}
                ></div>
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
                <div
                  className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4 ${
                    form.typeOfDonor === "Network Office / Agency"
                      ? "bg-primary-default"
                      : "bg-white"
                  }`}
                ></div>
                <span className="font-sans font-bold">
                  Network Office / Agency
                </span>
              </label>
            </div>
          </div>
        </div>

        <div
          className={`relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 h-32 font-sans text-primary-disabled flex flex-col`}
        >
          Bakit mo gusto magbigay ng iyong gatas/breastmilk?
          <span className=" mt-2">Answer: {form.QA}</span>
        </div>
        <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 h-32 font-sans text-primary-disabled flex flex-col">
          Paano mo nalaman ang tungkol sa Quezon City Hospital Human Milk Bank ?
          <span className=" mt-2">Answer: {form.QB}</span>
        </div>

        <div className="font-sans text-primary-disabled my-2">
          Note: Select your answer by ticking the circle
        </div>

        <div className="relative border rounded-md border-primary-default bg-white py-2 font-sans text-primary-disabled">
          <div class="flex flex-row gap-x-2 my-4">
            <div class="basis-1/12 ">
              <div className="flex justify-center ml-2 font-sans text-primary-default font-bold ">
                {" "}
                Yes{" "}
              </div>
              <div className="flex justify-center">
                <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
                <label
                  for="myCheckbox"
                  className="flex items-center cursor-not-allowed"
                >
                  <div
                    className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 ml-2 my-4 ${
                      form.MH1 === "Yes" ? "bg-primary-default" : "bg-white"
                    }`}
                  ></div>
                </label>
              </div>
              <div className="flex justify-center">
                <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
                <label
                  for="myCheckbox"
                  className="flex items-center cursor-not-allowed"
                >
                  <div
                    className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 ml-2 my-4 ${
                      form.MH2 === "Yes" ? "bg-primary-default" : "bg-white"
                    }`}
                  ></div>
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
                  <div
                    className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4 ${
                      form.MH1 === "No" ? "bg-primary-default" : "bg-white"
                    }`}
                  ></div>
                </label>
              </div>
              <div className="flex justify-center">
                <input type="checkbox" id="myCheckbox" class="hidden" checked />{" "}
                <label
                  for="myCheckbox"
                  className="flex items-center cursor-not-allowed"
                >
                  <div
                    className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4 ${
                      form.MH2 === "No" ? "bg-primary-default" : "bg-white"
                    }`}
                  ></div>
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

    3: (
      <div className=" my-6 w-auto 2xl:mx-[7%] mx-0">
        <div className="flex font-sans font-bold justify-center text-2xl text-primary-default">
          Medical History
        </div>

        <div className="font-sans text-primary-disabled my-2">
          Note: Select your answer by ticking the circle
        </div>
        <div className="relative border rounded-md border-primary-default bg-white  py-2 2xl:px-2 font-sans text-primary-disabled">
          <div className="flex flex-row gap-x-2 my-4">
            <div className="basis-1/12">
              <div className="flex justify-center ml-2 font-sans text-primary-default font-bold ">
                Yes
              </div>
              {[...Array(12)].map((_, index) => (
                <div className="flex justify-center " key={`yes-${index}`}>
                  <input
                    type="checkbox"
                    id={`myCheckboxYes${index}`}
                    className="hidden"
                    checked
                  />
                  <label
                    htmlFor={`myCheckboxYes${index}`}
                    className="flex items-center cursor-not-allowed"
                  >
                    <div
                      className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 ml-2 my-4 ${
                        form[`MH${index + 1}`] === "Yes"
                          ? "bg-primary-default"
                          : "bg-white"
                      }`}
                    ></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="basis-1/12">
              <div className="flex justify-center font-sans text-primary-default font-bold ">
                No
              </div>
              {[...Array(12)].map((_, index) => (
                <div className="flex justify-center" key={`no-${index}`}>
                  <input
                    type="checkbox"
                    id={`myCheckboxNo${index}`}
                    className="hidden"
                    checked
                  />
                  <label
                    htmlFor={`myCheckboxNo${index}`}
                    className="flex items-center cursor-not-allowed"
                  >
                    <div
                      className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 mr-2 my-4 ${
                        form[`MH${index + 1}`] === "No"
                          ? "bg-primary-default"
                          : "bg-white"
                      }`}
                    ></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="basis-3/2 ">
              <div className="flex flex-col 2xl:gap-y-[24.5px] md:gap-y-7 font-sans 2xl:text-lg md:text-[16px] md:mt-[5%] 2xl:my-8 mb-6">
                <span className="font-sans">
                  Nakapagbigay ka na ba ng iyong gatas dati?
                </span>
                <span className="font-sans">
                  Ikaw ba ay natanggihan na magbigay ng iyong gatas/breastmilk?
                  Kung oo, sa anong dahilan?
                  {form.MH2_Reason && (
                    <div className="border-b-[1px] border-primary-default w-auto px-2 absolute">
                      <span>{form.MH2_Reason}</span>
                    </div>
                  )}
                </span>
                <span className="font-sans">
                  Nakapagbigay ka na ba ng iyong gatas dati?
                </span>
                <span className="font-sans">
                  Normal ba ang panganganak mo sa huli mong anak?
                </span>
                <span className="font-sans">
                  Nagkaroon ka ba ng impeksiyon o sakit? Nagkaroon ka ba ng TB o
                  sakit sa atay?
                </span>
                <span className="font-sans">
                  Ikaw ba ay nasalinan ng dugo nitong nakaaran na 12 na buwan?
                </span>
                <span className="font-sans">
                  Ikaw ba ay naging recipient ng organ o tissue mula sa ibang
                  tao nitong nakaraang 12 na buwan?
                </span>
                <span className="font-sans">
                  Nakainom ka ba ng alak nitong nakaraang 24 oras? Kung oo,
                  gaano karami?
                  {form.MH8_Reason && (
                    <div className="border-b-[1px] border-primary-default w-auto px-2 absolute">
                      <span>{form.MH8_Reason}</span>
                    </div>
                  )}
                </span>
                <span className="font-sans">
                  Regular ka bang gumagamit ng mga gamot gaya ng
                  replacement/birth control hormones o pills?
                </span>
                <span className="font-sans">
                  Gumagamit ka ba ng mga “megadose vitamins” o mga “herbal
                  drugs”?
                </span>
                <span className="font-sans">
                  Ikaw ba ay hindi kumakain ng karne o isang “vegetarian”?
                </span>
                <span className="font-sans">
                  Kung oo, umiinom ka ba ng multivitamins?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    4: (
      <div className=" my-6 w-auto 2xl:mx-[7%] mx-0">
        <div className="flex font-sans font-bold justify-center text-2xl text-primary-default">
          Medical History
        </div>

        <div className="font-sans text-primary-disabled my-2">
          Note: Select your answer by ticking the circle
        </div>
        <div className="relative border rounded-md border-primary-default bg-white py-2 font-sans text-primary-disabled">
          <div className="flex flex-row gap-x-2 my-4">
            <div className="basis-1/12">
              <div className="flex justify-center ml-2 font-sans text-primary-default font-bold ">
                Yes
              </div>
              {[...Array(3)].map((_, index) => (
                <div className="flex justify-center" key={`yes-${index}`}>
                  <input
                    type="checkbox"
                    id={`myCheckboxYes${index}`}
                    className="hidden"
                    checked
                  />
                  <label
                    htmlFor={`myCheckboxYes${index}`}
                    className="flex items-center cursor-not-allowed"
                  >
                    <div
                      className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 ml-2 my-4 ${
                        form[`MH${index + 12}`] === "Yes"
                          ? "bg-primary-default"
                          : "bg-white"
                      }`}
                    ></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="basis-1/12">
              <div className="flex justify-center font-sans text-primary-default font-bold ">
                No
              </div>
              {[...Array(3)].map((_, index) => (
                <div className="flex justify-center" key={`no-${index}`}>
                  <input
                    type="checkbox"
                    id={`myCheckboxNo${index}`}
                    className="hidden"
                    checked
                  />
                  <label
                    htmlFor={`myCheckboxNo${index}`}
                    className="flex items-center cursor-not-allowed"
                  >
                    <div
                      className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 ml-2 my-4 ${
                        form[`MH${index + 12}`] === "No"
                          ? "bg-primary-default"
                          : "bg-white"
                      }`}
                    ></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="basis-3/2 ">
              <div className="flex flex-col gap-y-6 font-sans text-xl my-8 mb-6">
                <span className="font-sans">
                  Gumagamit ka ba ng bawal na gamot?
                </span>
                <span className="font-sans">
                  Ikaw ba ay naninigarilyo? If yes, how many sticks or packs per
                  day? ______
                </span>
                <span className="font-sans">
                  Ikaw ba ay naoperahan na sa suso at nalagyan ng “silicone” or
                  “artificial breast implants”?
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t-1 border-primary-default my-12" />

        <div className="flex font-sans font-bold justify-center text-2xl text-primary-default">
          Sexual History
        </div>

        <div className="font-sans text-primary-disabled my-2">
          Note: Select your answer by ticking the circle
        </div>
        <div className="relative border rounded-md border-primary-default bg-white py-2 font-sans text-primary-disabled">
          <div className="flex flex-row gap-x-2 my-4">
            <div className="basis-1/12">
              <div className="flex justify-center font-sans ml-2 text-primary-default font-bold ">
                Yes
              </div>
              {[...Array(2)].map((_, index) => (
                <div className="flex justify-center" key={`yes-${index}`}>
                  <input
                    type="checkbox"
                    id={`myCheckboxYes${index}`}
                    className="hidden"
                    checked
                  />
                  <label
                    htmlFor={`myCheckboxYes${index}`}
                    className="flex items-center cursor-not-allowed"
                  >
                    <div
                      className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 ml-2 my-4 ${
                        form[`MH${index + 12}`] === "Yes"
                          ? "bg-primary-default"
                          : "bg-white"
                      }`}
                    ></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="basis-1/12">
              <div className="flex justify-center font-sans text-primary-default font-bold ">
                No
              </div>
              {[...Array(2)].map((_, index) => (
                <div className="flex justify-center" key={`no-${index}`}>
                  <input
                    type="checkbox"
                    id={`myCheckboxNo${index}`}
                    className="hidden"
                    checked
                  />
                  <label
                    htmlFor={`myCheckboxNo${index}`}
                    className="flex items-center cursor-not-allowed"
                  >
                    <div
                      className={`w-5 h-5 border-2 border-primary-default rounded-full flex-shrink-0 ml-2 my-4 ${
                        form[`MH${index + 12}`] === "No"
                          ? "bg-primary-default"
                          : "bg-white"
                      }`}
                    ></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="basis-3/2">
              <div className="flex flex-col gap-y-6 font-sans text-xl my-8 mb-6">
                <span className="font-sans">
                  Nagkaroon ka na ba ng mga sakit na nakukuha sa
                  pakikipagtalik/sex?
                </span>
                <span className="font-sans">
                  Nagkaroon ka na ba ng karanasang makipagtalik sa higit pa sa
                  isang lalaki?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return pageContents[currentPage];
};

export default DonorPages;
