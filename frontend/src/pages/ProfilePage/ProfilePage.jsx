import React, { useState, useEffect } from "react";
import { getInitials } from "../../utils/helper";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const validatePhoneNumber = (phoneNumber) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phoneNumber);
};


const validateEmail = (email) => {
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailregex.test(email);
};

const ProfilePage = () => {
  let initialUser = null;
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      initialUser = JSON.parse(storedUser);
    } catch (e) {
      console.error("Error parsing stored user", e);
    }
  }
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto || null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] =
    useState(false);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePhoto", file);
      formData.append("userId", user._id);

      try {
        const response = await axiosInstance.put(
          "/update-profile-photo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const newProfilePhotoUrl = response.data.profilePhoto;
        setProfilePhoto(newProfilePhotoUrl);
        toast.success("Profile photo updated", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      } catch (error) {
        toast.error("Failed to upload profile photo", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
        console.error("Error uploading profile photo:", error);
      }
    }
  };

  useEffect(() => {
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setName(user?.fullName || "");
  }, [user]);

  const handleEmailChangeClick = () => {
    setIsEmailModalOpen(true);
  };

  const handleEmailModalClose = () => {
    setIsEmailModalOpen(false);
  };
  const AccountDeleted = () => {
    localStorage.clear();
    navigate("/signup");
    toast.success("Account deleted successfully", {
      style: {
        fontSize: "13px",
        maxWidth: "400px",
        boxShadow: "px 4px 8px rgba(0, 1, 4, 0.1)",
        borderRadius: "8px",
        borderColor: "rgba(0, 0, 0, 0.8)",
        marginRight: "10px",
      },
    });
  };
  const handleEmailModalSave = async () => {
    try {
      console.log("New email to update:", newEmail);
      const response = await axiosInstance.put(`/update-email`, { newEmail });
      console.log("Response from API:", response);

      if (response.data&&validateEmail(newEmail)) {
        // Update email in state and local storage
        const updatedUser = { ...user, email: newEmail };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Email updated", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
        setIsEmailModalOpen(false);
      } else {
        toast.error("Failed to update email", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to update email", {
        style: {
          fontSize: "13px",
          maxWidth: "400px",
          boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
          marginRight: "10px",
        },
      });
      console.error("Error updating email:", error);
    }
  };

  const handlePhoneChangeClick = () => {
    setIsPhoneModalOpen(true);
  };

  const handlePhoneModalClose = () => {
    setIsPhoneModalOpen(false);
  };

  const handlePhoneModalSave = async () => {
    try {
      if (!validatePhoneNumber(newPhone)) {
        return toast.error("Invalid phone number", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      }
      console.log("New phone to update:", newPhone);
      const response = await axiosInstance.put(`/update-phone`, {
        newPhone,
        userId: user._id,
      });
      console.log("Response from API:", response);

      if (response.data) {
        // Update phone in state and local storage
        const updatedUser = { ...user, phone: newPhone };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Phone number updated", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
        setIsPhoneModalOpen(false);
      } else {
        toast.error("Failed to update phone number", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to update phone number", {
        style: {
          fontSize: "13px",
          maxWidth: "400px",
          boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
          marginRight: "10px",
        },
      });
      console.error("Error updating phone number:", error);
    }
  };

  const handleAccountDelete = async () => {
    // making API call
    const response = await axiosInstance.delete(`/delete-user`, {
      userId: user._id,
    });
    if (!response.error) {
      console.log("Account deleted");
      AccountDeleted();
    }
    setIsAccountDeleteModalOpen(false);
  };

  const handleAccountDeleteModalClose = () => {
    setIsAccountDeleteModalOpen(false);
  };

  //adding name change function

  const handleNameChangeClick = () => {
    setIsNameModalOpen(true);
  };
  const handleNameChangeClose = () => {
    setIsNameModalOpen(false);
  };

  const handleNameModalSave = async () => {
    try {
      console.log("New name to update:", newName);
      const response = await axiosInstance.put(`/update-fullName`, {
        newName,
      });
      console.log("Response from API:", response);

      if (response.data) {
        // Update email in state and local storage
        const updatedUser = { ...user, name: newName };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Name updated", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
        setIsNameModalOpen(false);
      } else {
        toast.error("Failed to update name", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to update email", {
        style: {
          fontSize: "13px",
          maxWidth: "400px",
          boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
          marginRight: "10px",
        },
      });
      console.error("Error updating email:", error);
    }
  };

  console.log(user);

  return (
    <div className="bg-gray-50 relative">
      <Navbar userInfo={user} />
      <Link to="/dashboard">
        <div className="p-5">
          <button className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
            <IoMdArrowRoundBack />
          </button>
        </div>
      </Link>
      <div className="flex">
        <div className="container items-center justify-center px-4 pb-28">
          <div>
            <div className="bg-white relative shadow rounded-lg w-full md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto mt-12">
              <div className="flex justify-center">
                <div
                  className="flex items-center justify-center p-3 rounded-full text-slate-950 font-medium bg-gray-50 cursor-pointer mx-auto absolute -top-16 md:-top-20 w-24 md:w-32 h-24 md:h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110 text-3xl md:text-4xl"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {profilePhoto ? (
                    <img
                      src={`http://localhost:8000${profilePhoto}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(user?.fullName || "")
                  )}
                  {isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-[10px] rounded-full">
                      Add Profile Image
                    </div>
                  )}
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhotoUpload}
                />
                {/* {profilePhoto && (
                  <img src={`http://localhost:8000${profilePhoto}`} />
                )} */}
              </div>

              <div className="mt-16">
                {user && (
                  <>
                    <h1 className="font-bold text-center text-3xl text-gray-900">
                      {user.fullName}
                    </h1>
                    <p className="text-center text-sm mt-2 text-gray-400 font-medium">
                      {email}
                    </p>
                  </>
                )}
                <p>
                  <span></span>
                </p>

                {/* My Account */}
                <div className="w-full">
                  <h3 className="font-medium text-xl mt-8 pb-3 text-gray-900 text-center px-2">
                    My Account
                  </h3>
                  <div className="w-full flex flex-col items-center overflow-hidden text-sm">
                    <div className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                      <p> {user?.name || "User Name"}</p>
                      <button
                        onClick={handleNameChangeClick}
                        className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                      >
                        Change Name
                      </button>
                    </div>

                    {isNameModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-5 rounded-lg shadow-lg z-10 w-[90%] max-w-md">
                          <h2 className="text-xl font-bold mb-4">Enter Name</h2>
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                            placeholder="Name"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={handleNameChangeClose}
                              className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-300  border-gray-800 transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleNameModalSave}
                              className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                      <p>{email || "User Email"}</p>
                      <button
                        onClick={handleEmailChangeClick}
                        className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                      >
                        Change Email
                      </button>
                    </div>

                    {/* Modal for email  */}
                    {isEmailModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-5 rounded-lg shadow-lg z-10 w-[90%] max-w-md">
                          <h2 className="text-xl font-bold mb-4">
                            Enter Email
                          </h2>
                          <input
                            type="text"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                            placeholder="Email"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={handleEmailModalClose}
                              className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-300  border-gray-800 transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleEmailModalSave}
                              className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                      {user?.phone || "User Phone"}
                      <button
                        onClick={handlePhoneChangeClick}
                        className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                      >
                        Change Phone
                      </button>
                    </p>

                    {/* Modal for phone number  */}
                    {isPhoneModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-5 rounded-lg shadow-lg z-10 w-[90%] max-w-md">
                          <h3 className="text-lg font-semibold mb-4">
                            Change Phone
                          </h3>
                          <input
                            type="tel"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            placeholder="Enter new phone number"
                            className="w-full px-3 py-2 mb-4 border rounded-lg"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-300  border-gray-800 transition-all"
                              onClick={handlePhoneModalClose}
                            >
                              Cancel
                            </button>
                            <button
                              className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all"
                              onClick={handlePhoneModalSave}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* <p className="w-full  border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                      Connect with:
                      <div className="flex pt-3 justify-between items-center gap-6 px-2 ">
                        <a className="text-gray-800  bg-gray-300  border border-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150 ease-in font-medium text-xs text-center w-full py-3">
                          Instagram
                        </a>
                        <a className="text-gray-800  bg-gray-300  border border-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150 ease-in font-medium text-xs text-center w-full py-3">
                          Twitter
                        </a>
                        <a className="text-gray-800  bg-gray-300  border border-gray-300 hover:text-gray-900 hover:bg-gray-100    rounded-md cursor-pointer transition duration-150 ease-in font-medium text-xs text-center w-full py-3">
                          Email
                        </a>
                      </div>
                    </p> */}
                  </div>

                  {/* My Settings  */}
                  <h3 className="font-medium text-xl  mt-8 pb-3 text-gray-900 text-center px-2">
                    My Settings
                  </h3>
                  <div className="w-full flex flex-col items-center overflow-hidden text-sm">
                    <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                      Allow Notifications
                      <label className="inline-flex p-3 items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </p>

                    <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                      Dark Mode
                      <label className="inline-flex p-3 items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </p>

                    <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                      2-step verification
                      <label className="inline-flex p-3 items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </p>
                    <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                      Set timezone automatically using your location
                      <label className="inline-flex p-3 items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </p>

                    <p
                      className="w-full border-t text-red-500 border cursor-pointer border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
                      onClick={() => setIsAccountDeleteModalOpen(true)}
                    >
                      Delete my account
                    </p>

                    {/* Delete Account Confirmation Modal */}
                    {isAccountDeleteModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-5 rounded-lg shadow-lg z-10 w-[90%] max-w-md">
                          <h2 className="text-lg font-semibold mb-4">
                            Confirm Delete
                          </h2>
                          <p className="mb-4">
                            Are you sure you want to delete your account?
                          </p>
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              onClick={handleAccountDeleteModalClose}
                              className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-300  border-gray-800 transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAccountDelete}
                              className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-10" />
    </div>
  );
};

export default ProfilePage;
