import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RemarksModal from "./remarksModal";
import { WebHost } from "../../../MyConstantSuperAdmin";
import axios from "axios";

export default function UserManagement() {
  const navigate = useNavigate();
  const [isRemarksModalOpen, setRemarksModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null); 
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [userType, setUserType] = useState("");


  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${WebHost}/kalinga/getAllUsers`);
        const data = await response.json();
        if (response.ok) {
          setUsers([...data.donors, ...data.requestors]);
          setFilteredUsers([...data.donors, ...data.requestors]);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, []);


  const handleView = () => {
    navigate("/admin/DonorVerification");
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleRemarksModal = (user) => {
    setSelectedUser(user);
    setRemarksModalOpen(true);
  };

  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
    if (selectedType === "Donor") {
      setFilteredUsers(users.filter(user => user.userType === "Donor"));
    } else if (selectedType === "Requestor") {
      setFilteredUsers(users.filter(user => user.userType === "Requestor"));
    } else {
      setFilteredUsers(users);
    }
  };

 
 
  const handleDelete = async (id, userType) => {
    try {
      if (!id) {
        console.error('Error deleting user: ID is undefined');
        return;
      }
  
      console.log('Deleting user:', id, userType); // Log user data
  
      const response = await axios.delete(`${WebHost}/kalinga/deleteUser/${id}/${userType}`);
      console.log('Delete response status:', response.status); // Log response status
  
      if (response.status === 200) {
        console.log('User deleted successfully');
        // Update state after successful deletion
        const updatedUsers = users.filter(user => (userType === 'Donor' ? user.Donor_ID : user.Requestor_ID) !== id);
        const updatedFilteredUsers = filteredUsers.filter(user => (userType === 'Donor' ? user.Donor_ID : user.Requestor_ID) !== id);
        console.log('Updated users:', updatedUsers);
        console.log('Updated filteredUsers:', updatedFilteredUsers);
        setUsers(updatedUsers);
        setFilteredUsers(updatedFilteredUsers);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="p-8 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans my-4 mb-6">
              User Management
            </h1>
            <div className="px-8">
              <div className="flex flex-col items-end xl:gap-x-6 lg:gap-x-3">
                <button
                  onClick={toggleFilterVisibility}
                  className="bg-primary-default text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-neutral-variant flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 36 36"
                    className="mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="M22 33V19.5L33.47 8A1.81 1.81 0 0 0 34 6.7V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1.67a1.79 1.79 0 0 0 .53 1.27L14 19.58v10.2Z"
                      className="clr-i-solid clr-i-solid-path-1"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M33.48 4h-31a.52.52 0 0 0-.48.52v1.72a1.33 1.33 0 0 0 .39.95l12 12v10l7.25 3.61V19.17l12-12a1.35 1.35 0 0 0 .36-.91V4.52a.52.52 0 0 0-.52-.52"
                      className="clr-i-solid clr-i-solid-path-1"
                    ></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                  </svg>
                  Filter By
                </button>

                {isFilterVisible && (
                  <div className="mt-2 w-auto gap-x-4 bg-neutral-variant flex p-2 px-6 pb-4 rounded-md shadow-md justify-end">
                    <div className="border-b border-primary-default">
                      <label className="text-xs text-primary-default">User</label>
                      <select
                        className="bg-white text-primary-default text-xl py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full"
                        value={userType}
                        onChange={handleUserTypeChange}
                      >
                        <option value="">Select User Type</option>
                        <option value="Donor">Donor</option>
                        <option value="Requestor">Requestor</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-primary-default">
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900">
                                {user.fullName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center text-sm text-gray-500">
                                {user.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center text-sm text-gray-500">
                                {user.userType}
                              </div>
                            </td>
                            
                            
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
                                onClick={() => handleDelete(user.Requestor_ID || user.Donor_ID, user.userType)}
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
            {isRemarksModalOpen && (
              <RemarksModal
                isOpen={isRemarksModalOpen}
                onClose={() => setRemarksModalOpen(false)}
                user={selectedUser}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
