import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const responseMsg = async (response) => {
        try {
            const token = response.credential;
            const res = await axiosInstance.post('/google-auth', { token });

            if (res.data && res.data.accessToken) {
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/dashboard");
                toast.success("Signed in successfully", {
                    style: {
                        fontSize: "13px",
                        maxWidth: "400px",
                        boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
                        borderRadius: "8px",
                        borderColor: "rgba(0, 0, 0, 0.8)",
                        marginTop: "60px",
                        marginRight: "10px",
                    },
                });
            } else {
                toast.error("Failed to sign in with Google", {
                    style: {
                        fontSize: "13px",
                        maxWidth: "400px",
                        boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
                        borderRadius: "8px",
                        borderColor: "rgba(0, 0, 0, 0.8)",
                        marginTop: "60px",
                        marginRight: "10px",
                    },
                });
            }
        } catch (error) {
            console.log("Error response:", error.response);
            toast.error("Failed to sign in with Google", {
                style: {
                    fontSize: "13px",
                    maxWidth: "400px",
                    boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
                    borderRadius: "8px",
                    borderColor: "rgba(0, 0, 0, 0.8)",
                    marginTop: "60px",
                    marginRight: "10px",
                },
            });
        }
    };

    const errorMsg = (error) => {
        console.log(error);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email', {
                style: {
                    fontSize: '13px',
                    maxWidth: '400px',
                    boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    marginTop: '60px',
                    marginRight: '10px',
                }
            });
            return;
        }

        if (!password) {
            toast.error('Please enter a valid password', {
                style: {
                    fontSize: '13px',
                    maxWidth: '400px',
                    boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    marginTop: '60px',
                    marginRight: '10px',
                }
            });
            return;
        }

        setError(null);

        try {
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
                setUser(response.data.user); // Assuming response includes user data
                navigate("/dashboard");
                toast.success('Logged in successfully', {
                    style: {
                        fontSize: '13px',
                        maxWidth: '400px',
                        boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                        borderRadius: '8px',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        marginTop: '60px',
                        marginRight: '10px',
                    }
                });
            } else {
                toast.error('Login failed, please try again', {
                    style: {
                        fontSize: '13px',
                        maxWidth: '400px',
                        boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                        borderRadius: '8px',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        marginTop: '60px',
                        marginRight: '10px',
                    }
                });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, {
                    style: {
                        fontSize: '13px',
                        maxWidth: '400px',
                        boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                        borderRadius: '8px',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        marginTop: '60px',
                        marginRight: '10px',
                    }
                });
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className='fixed top-0 left-0 right-0 z-50'>
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
                                Smart note-taking for smarter work and better results. Stay organized, stay inspired, and stay ahead.
                            </p>
                        </div>
                    </section>
                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <h1 className="mt-12 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                    Welcome Back!
                                </h1>

                                <p className="mt-4 leading-relaxed text-gray-500">
                                    Smart note-taking for smarter work and better results. Stay organized, stay inspired, and stay ahead.
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-12">
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 p-2 w-full rounded-md border border-gray-100 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-12">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="Password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mt-1 p-2 w-full rounded-md border border-gray-100 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="MarketingAccept" className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            id="MarketingAccept"
                                            name="marketing_accept"
                                            className="size-4 rounded-md border border-gray-100 bg-white shadow-sm"
                                        />

                                        <span className="text-xs text-gray-700">
                                            Remember for next 30 days
                                        </span>
                                    </label>
                                </div>

                                <div className="col-span-12 sm:flex sm:items-center mt-4 sm:gap-4 mb-6">
                                    <button
                                        className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700 transition-all"
                                        type="submit"
                                    >
                                        Login
                                    </button>


                                    <div className="mb-3">
                                        <GoogleLogin
                                            clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
                                            onSuccess={responseMsg}
                                            onError={errorMsg}
                                        />
                                    </div>
                                </div>
                            </form>
                            <p className="mt-8 text-sm text-gray-500 sm:mt-0">
                                Don't have an account? <span> </span>
                                <Link to="/signup" className="text-gray-700 underline font-semibold">Signup</Link>.
                            </p>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};

export default Login;