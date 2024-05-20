import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { WebHost } from "../../../MyConstantAdmin";
import { Loader } from "../../components/loader";
import axios from "axios";
import BlockConfirmationModal from "../../modal/BlockConfirmationModal";

export default function UserManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isRemarksModalOpen, setRemarksModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [userType, setUserType] = useState("");
  const [form, setForms] = useState([]);
  const [filters, setFilters] = useState({
    monthOfCreation: "",
    monthScheduled: "",
    status: "",
    remarks: "",
  });

  const usersPerPage = 10; // Fixed typo: changed 'usesrsPerPage' to 'usersPerPage'
  const [currentPage, setCurrentPage] = useState(1); // Added state for current page

  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    }
    fetchData();
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
    applyFilters(selectedType, filters.monthOfCreation);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    applyFilters(userType, value);
  };

  const applyFilters = (selectedType, selectedMonth) => {
    let filtered = users;

    if (selectedType) {
      filtered = filtered.filter((user) => user.userType === selectedType);
    }

    if (selectedMonth) {
      filtered = filtered.filter(
        (user) =>
          new Date(user.createdAt).getMonth() ===
          months.find((month) => month.name === selectedMonth).id - 1
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleDelete = async (id, userType) => {
    try {
      if (!id) {
        console.error("Error deleting user: ID is undefined");
        return;
      }

      const response = await axios.delete(
        `${WebHost}/kalinga/deleteUser/${id}/${userType}`
      );

      if (response.status === 200) {
        const updatedUsers = users.filter(
          (user) =>
            (userType === "Donor" ? user.Donor_ID : user.Requestor_ID) !== id
        );
        const updatedFilteredUsers = filteredUsers.filter(
          (user) =>
            (userType === "Donor" ? user.Donor_ID : user.Requestor_ID) !== id
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedFilteredUsers);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleBlock = () => {
    setShowModal(true);
  };

  const handleApproveConfirm = () => {
    // Add your logic for handling the "Solved" button action here
    setShowModal(false); // Close the modal
  };

  const handleApproveCancel = () => {
    setShowModal(false); // Close the modal
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
                  className="bg-primary-default text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600 shadow-md flex items-center"
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
                      <label className="text-xs text-primary-default">
                        Month Created
                      </label>
                      <select
                        className="bg-white text-primary-default text-lg py-1 pl-2 rounded-sm hover:cursor-pointer w-full"
                        name="monthOfCreation"
                        value={filters.monthOfCreation}
                        onChange={handleFilterChange}
                      >
                        <option value="">Select Month Created</option>
                        {months.map((month) => (
                          <option key={month.id} value={month.name}>
                            {month.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="border-b border-primary-default">
                      <label className="text-xs text-primary-default">
                        User
                      </label>
                      <select
                        className="bg-white text-primary-default text-lg py-1 pl-2 rounded-sm hover:cursor-pointer w-full"
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
                {loading ? (
                  <Loader isLoading={loading} />
                ) : (
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
                                  {new Date(
                                    user.createdAt
                                  ).toLocaleDateString()}
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

                              <td className="text-center py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center ">
                                {/* VIEW */}
                                {/* <Link
                                  to={{
                                    pathname:
                                      userType === "Donor"
                                        ? `/admin/DonorVerification/${form.Applicant_ID}`
                                        : `/admin/requestorVerification/${form.Applicant_ID}`,
                                  }}
                                > */}
                                <button
                                  onClick={""}
                                  className="px-3  rounded-full hover:bg-neutral-variant"
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
                                </button>
                                {/* BLOCK */}
                                <button
                                  onClick={handleBlock}
                                  className="px-3  rounded-full hover:bg-neutral-variant"
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
                                      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q1.35 0 2.6-.437t2.3-1.263L5.7 7.1q-.825 1.05-1.263 2.3T4 12q0 3.35 2.325 5.675T12 20m6.3-3.1q.825-1.05 1.263-2.3T20 12q0-3.35-2.325-5.675T12 4q-1.35 0-2.6.437T7.1 5.7z"
                                    ></path>
                                  </svg>
                                </button>
                                {/* DELETE */}
                                <button
                                  onClick={() =>
                                    handleDelete(
                                      user.Requestor_ID || user.Donor_ID,
                                      user.userType
                                    )
                                  }
                                  className="px-3 rounded-full hover:bg-neutral-variant"
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
                )}
              </div>
            </div>
            <div className="flex justify-end">
              {/* Pagination */}
              <nav className="block">
                <ul className="flex pl-0 rounded list-none flex-wrap">
                  <button
                    className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                    onClick={handlePrevClick}
                  >
                    {"<"}
                  </button>
                  {pageNumbers.map((number) => (
                    <li key={number}>
                      <button
                        className={`${
                          currentPage === number
                            ? "hover:font-bold hover:text-primary-default text-lg font-sans text-primary-disabled py-2 px-2 font-bold"
                            : "text-lg font-sans text-primary-disabled py-2 px-4"
                        } `}
                        onClick={() => goToPage(number)}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  <button
                    className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                    onClick={handleNextClick}
                  >
                    {">"}
                  </button>
                </ul>
              </nav>
            </div>
            <BlockConfirmationModal
              isOpen={showModal}
              onCancel={handleApproveConfirm}
              onConfirm={handleApproveCancel}
              message="Are you sure you want to block this account? Once blocked, the account will be permanently not be able to use the app's features."
            />
          </div>
        </div>
      </section>
    </>
  );
}
