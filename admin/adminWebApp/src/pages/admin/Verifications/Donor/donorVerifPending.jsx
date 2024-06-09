import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantAdmin";
import { Loader } from "../../../../components/loader";
import { RenderPendingVerification } from "../../../../components/Verification/RenderPendingVerification";
import { getToken } from "../../../../functions/Authentication";

export default function () {
  useEffect(() => {
    // Prevent scrolling of the entire page
    document.body.style.overflowY = "hidden";
    // Scrolling
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const userType = "Donor";

  const [token, setToken] = useState(null)

  useEffect(() => {
    const token =getToken()
    if(token)setToken(token)
  },[])

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("Fetching Data");
      const token = getToken()
      const response = await axios.post(`${WebHost}/kalinga/fetchPendingScreeningFormByUserType/${userType}`,
      { status: "Pending"},
      { headers: {Authorization: `Bearer ${token}`}}
    )
      // console.log("response: ", response.data.screeningForms)
      console.log(response.data.messages.message)
      if (!response.data.screeningForms) {
        console.log("Error fetching Screening Forms");
      } else {
        setForms(response.data.screeningForms);
        console.log("Fetch Screening Forms Successfully");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log("forms: ",forms)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="p-8 pt-2">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl text-primary-default font-bold font-sans py-4">
              Donor Pendings
            </h1>
            
          </div>

          <div
            className="overflow-hidden flex flex-col gap-y-4 mt-4"
            style={{ maxHeight: "calc(100vh - 8rem)" }}
          >
            <div className="p-10 pt-2 overflow-y-auto">
              {loading ? (
                <Loader isLoading={loading} />
              ) : (
                <>
                  {forms.length > 0 ? (
                    forms.map((form, index) => (
                      <RenderPendingVerification
                        key={index}
                        name={form.fullName}
                        email={form.email}
                        date={form.createdAt}
                        form={form}
                        userType={form.userType}
                      />
                    ))
                  ) : (
                    <div className="bg-white rounded-2xl mb-4 flex items-center justify-center border border-primary-default py-2">
                      No Pending Donor Application at the moment
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
