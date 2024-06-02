import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

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
            })
            return
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
            })
            return
        }

        setError("")

        // login api call

        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            })

            // handle successful login response
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken)
                navigate("/dashboard")
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
                })
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // setError(error.response.data.message)
                toast.error('Please enter valid credentials', {
                    style: {
                        fontSize: '13px',
                        maxWidth: '400px',
                        boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                        borderRadius: '8px',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        marginTop: '60px',
                        marginRight: '10px',
                    }
                })
            } else {
                setError("Something went wrong. Please try again later.")
            }
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

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
                            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute h-full w-full object-cover opacity-80 "
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <a className="block text-white" href="#">
                                <span className="sr-only">Home</span>
                            </a>

                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Welcome Back!
                            </h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                quibusdam aperiam voluptatum.
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
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                    quibusdam aperiam voluptatum.
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-10">
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

                                <div className="col-span-10">
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

                                <div className="col-span-6 sm:flex sm:items-center mt-4 sm:gap-4">
                                    <button
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                        type="submit"
                                    >
                                        Login
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Don't have an account? <span> </span>
                                        <Link to="/signup" className="text-gray-700 underline font-semibold">Signup</Link>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    )
}

export default Login
