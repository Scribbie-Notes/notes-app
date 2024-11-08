import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import CircularLoader from "../../components/CircularLoader";

const VerifyOtp = ({ setUser }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams()

  const handleOtpSend = async (e) => {
    e.preventDefault();

    console.log(id);
    
    try {
      const response = await axiosInstance.post("http://localhost:5000/verify-otp", {
        id: id,
        otp: otp
      });

      if (response.data) {
        navigate(`/reset-password/${id}`);
        toast.success("Otp verified", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "px 4px 8px rgba(0, 1, 4, 0.1)", 
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      } else {
        toast.error("Login failed, please try again", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      }
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1577083639236-0f560d3d771c?q=80&w=1367&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute h-full w-full object-cover opacity-30"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome Back!
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Smart note-taking for smarter work and better results. Stay
                organized, stay inspired, and stay ahead.
              </p>
            </div>
          </section>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <h1 className="mt-12 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome Back!
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Smart note-taking for smarter work and better results. Stay
                  organized, stay inspired, and stay ahead.
                </p>
              </div>

              <form
                onSubmit={handleOtpSend}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-12">
                  <label
                    htmlFor="Email"
                    className="block text-xl font-bold mb-4 text-gray-700"
                  >
                    Enter OTP received on your mail id
                  </label>
                  <input
                    type="text"
                    id="Otp"
                    name="Otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 p-2 w-full rounded-md border border-gray-100 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-12 sm:flex sm:items-center mt-4 sm:gap-4 mb-6">
                  <button
                    className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700 transition-all"
                    type="submit"
                  >
                    {loading ? (
                      <span className="gap-x-2 flex justify-center items-center">
                        <CircularLoader /> Verifying OTP
                      </span>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>

                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default VerifyOtp;
