import React from 'react'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import hero2 from "../../assets/images/hero2.png";
import { SiTicktick } from "react-icons/si";
import { TbEyeSearch } from "react-icons/tb";
import { FaSync } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { MdEditSquare } from "react-icons/md";
import { IoLogoApple } from "react-icons/io5";
import { FaWindows } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import Testimonial from '../Testimonial';
import Footer from '../Footer';
import Brands from '../Brands';
import './styles.css';
import Pricing from '../Pricing';

const Hero = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="h-full scroll-smooth">
            <Navbar userInfo={user} />
            {/* <section className="w-screen animated-background h-screen bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-500"> */}
            <section className="bg-white">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-2 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-gray-900">Capture Ideas,</h1>
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-gray-900">Unleash Productivity.</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-800">Capture every thought and organize with ease. Unlock your full potential with <span className="font-semibold">Scribbie</span></p>
                        <Link to="/signup" className="">
                            <a href="#" className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
                                Get Started
                                <svg className="w-5 h-5 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </a>
                        </Link>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={hero2} alt="landing-pic" />
                    </div>
                </div>
            </section>


            {/* SECTION 2  */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-12 mt-8 mb-4">
                <h1 className="text-4xl font-bold text-center text-gray-900">Unlock Powerful Features to </h1>
                <h1 className="text-4xl font-bold mb-14 text-center text-gray-900">Enhance Your Note-Taking Experience</h1>
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200">
                            <div className="flex items-center mb-4 gap-3">
                                <SiTicktick className='text-2xl text-gray-900' />
                                <h3 className="text-xl font-bold">Organize Effortlessly</h3>
                            </div>
                            <p className="text-gray-700 ">Keep your notes neatly categorized with customizable folders and tags.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200">
                            <div className='flex items-center mb-4 gap-3'>
                                <TbEyeSearch className='text-3xl text-gray-900' />
                                <h3 className="text-xl font-bold">Search with Ease</h3>
                            </div>
                            <p className="text-gray-700">Instantly find what you're looking for with our powerful search functionality.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200">
                            <div className='flex items-center mb-4 gap-3'>
                                <FaSync className='text-xl text-gray-900' />
                                <h3 className="text-xl font-bold">Sync Across Devices</h3>
                            </div>
                            <p className="text-gray-700">Access your notes anytime, anywhere with seamless cross-device synchronization.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200">
                            <div className='flex items-center mb-4 gap-3'>
                                <MdGroupAdd className='text-2xl text-gray-900' />
                                <h3 className="text-xl font-bold">Collaborate in Real-Time</h3>
                            </div>
                            <p className="text-gray-700 ">Work together with colleagues or friends by sharing and editing notes in real-time.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200">
                            <div className='flex items-center mb-4 gap-3'>
                                <GrSecure className='text-2xl text-gray-900' />
                                <h3 className="text-xl font-bold">Secure Your Notes</h3>
                            </div>
                            <p className="text-gray-700">Protect your information with advanced encryption and secure login options.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200">
                            <div className='flex items-center mb-4 gap-3'>
                                <MdEditSquare className='text-2xl text-gray-900' />
                                <h3 className="text-xl font-bold">Rich Text Editing</h3>
                            </div>
                            <p className="text-gray-700">Enhance your notes with rich text formatting, images, and links.</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            {/* SECTION 3  */}
            <Testimonial />
            <hr />

            {/* SECTION 4  */}
            <Pricing/>

            {/* SECTION 5  */}
            <hr />
            <Brands />

            {/* SECTION 6 */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-12 mt-8 mb-24">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-14">Available on All Your Devices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition duration-300 ease-in-out border border-gray-200">
                            <div className="flex items-center mb-3 gap-3">
                                <IoLogoApple className='text-3xl text-gray-900 mb-1' />
                                <h3 className="text-xl font-bold">Get it on the App Store</h3>
                            </div>
                            <p className="text-gray-700">Download our app from the App Store and take your notes on the go with your iPhone or iPad.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition duration-300 ease-in-out border border-gray-200">
                            <div className="flex items-center mb-3 gap-3">
                                <BiLogoPlayStore className='text-3xl text-gray-900 mb-1' />
                                <h3 className="text-xl font-bold mb-2">Get it on the Play Store</h3>
                            </div>
                            <p className="text-gray-700">Android users can easily access our app from the Play Store and stay organized anywhere.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition duration-300 ease-in-out border border-gray-200">
                            <div className="flex items-center mb-3 gap-3">
                                <FaWindows className='text-3xl text-gray-900 mb-1' />
                                <h3 className="text-xl font-bold mb-2">Available for Windows</h3>
                            </div>
                            <p className="text-gray-700">Download our app for Windows and manage your notes seamlessly on your desktop.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Hero
