import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RemarksModal from "./remarksModal";
import { WebHost } from "../../../MyConstantSuperAdmin";


export default function UserManagement() {
  const navigate = useNavigate();
  const [isRemarksModalOpen, setRemarksModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await get(`${WebHost}//kalinga/getAllUsers`); // Updated endpoint for fetching all users
              const data = await response.json();
              if (response.ok) {
                  setUsers([...data.donors, ...data.requestors]); // Concatenate donors and requestors
              } else {
                  console.error("Failed to fetch users:", data.messages.message);
              }
          } catch (error) {
              console.error("Error fetching users:", error);
          }
      }
      fetchData();
  }, []);

  const handleDelete = (id) => {
      setUsers(users.filter((user) => user.id !== id));
  };

  const handleView = () => {
      navigate("/admin/DonorVerification");
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleRemarksModal = (user) => {
      setSelectedUser(user);
      setRemarksModalOpen(true);
  };

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="p-8 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans my-4 mb-6">
              User Management
            </h1>
            <div className="flex flex-col">
              <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-primary-default border">
                      <thead className="bg-neutral-variant">
                        <tr>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Created On
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Remarks
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-primary-default">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900">
                                {user.createdAt}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900">
                                {user.fullName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center text-sm text-gray-500">
                                {user.emailAddress}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900">
                                {user.UserType}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`flex justify-center px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.status === "Complete"
                                    ? "bg-lime-200 text-green-800"
                                    : user.status === "Pending"
                                    ? "bg-blue-100 text-red-800"
                                    : user.status === "Ongoing"
                                    ? "bg-yellow-100 text-red-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="text-center">Remarks</td>

                            <td className="text-center py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center gap-2">
                              <Link
                                to={`/admin/donorAppointmentConfirmation/`}
                                className=" px-3 py-1 rounded-full hover:bg-neutral-variant mr-1"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 32 32"
                                >
                                  <circle
                                    cx={16}
                                    cy={16}
                                    r={4}
                                    fill="#E60965"
                                  ></circle>
                                  <path
                                    fill="#E60965"
                                    d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5"
                                  ></path>
                                </svg>
                              </Link>
                              <button
                                onClick={() => handleDelete(appointment.id)}
                                className="px-3 py-1 rounded-full hover:bg-neutral-variant"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="21"
                                  height="21"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#E60965"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                                  ></path>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isRemarksModalOpen && selectedUser && (
        <RemarksModal
          isOpen={isRemarksModalOpen}
          message={
            selectedUser.status === "Approved"
              ? "This donor is approved."
              : "This donor is rejected."
          }
          onCancel={() => setRemarksModalOpen(false)}
        />
      )}
    </>
  );
}
