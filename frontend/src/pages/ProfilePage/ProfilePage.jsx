import React from 'react';
import { getInitials } from '../../utils/helper';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const ProfilePage = ({ user }) => {
    return (
        <div className="bg-gray-50">
            <Navbar userInfo={user} />
            <div className='flex'>
                <Link to='/dashboard'>
                    <div className='p-5'>
                        <button className='inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'>
                            <IoMdArrowRoundBack />
                        </button>
                    </div>
                </Link>
                <div className="container mx-auto my-28">
                    <div>
                        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
                            <div className="flex justify-center">
                                <div className="flex items-center justify-center p-3 rounded-full text-slate-950  font-medium bg-gray-50 cursor-pointer mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110 text-4xl cursor-default">
                                    {getInitials(user?.fullName || 'User')}
                                </div>
                            </div>

                            <div className="mt-16">
                                {user && (
                                    <>
                                        <h1 className="font-bold text-center text-3xl text-gray-900">{user.fullName}</h1>
                                        <p className="text-center text-sm text-gray-400 font-medium">{user.email}</p>
                                    </>
                                )}
                                <p>
                                    <span></span>
                                </p>


                                <div className="w-full">
                                    {/* My Account */}
                                    <h3 className="font-medium text-xl  mt-12 pb-3 text-gray-900 text-center px-2">My Account</h3>
                                    <div className=" w-full flex flex-col items-center overflow-hidden text-sm">
                                        <p className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                            {user?.fullName || 'User Name'}
                                        </p>

                                        <div className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                                            <p>
                                                {user?.email || 'User Email'}
                                            </p>
                                            <button className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
                                                Change Email
                                            </button>
                                        </div>


                                        <p className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                            {user?.phone || 'User Phone'}
                                        </p>

                                        <p className="w-full  border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                            Connect with:
                                            <div className="flex pt-3 justify-between items-center gap-6 px-2 ">
                                                <a className="text-gray-800 bg-gray-300  border border-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150 ease-in font-medium text-xs text-center w-full py-3">Instagram</a>
                                                <a className="text-gray-800 bg-gray-300  border border-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150 ease-in font-medium text-xs text-center w-full py-3">Twitter</a>
                                                <a className="text-gray-800 bg-gray-300  border border-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150 ease-in font-medium text-xs text-center w-full py-3">Email</a>
                                            </div>
                                        </p>

                                    </div>

                                    {/* My Settings  */}
                                    <h3 className="font-medium text-xl  mt-12 pb-3 text-gray-900 text-center px-2">My Settings</h3>
                                    <div className="w-full flex flex-col items-center overflow-hidden text-sm">

                                        <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                                            Allow Notifications
                                            <label className="inline-flex p-3 items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </p>


                                        <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                                            Appearance

                                            <div class="p-3 flex gap-4">
                                                <div class="flex items-center">
                                                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-800">Dark Mode</label>
                                                </div>
                                                <div class="flex items-center">
                                                    <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-800">Light Mode</label>
                                                </div>
                                            </div>
                                        </p>


                                        <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                                            2-step verification
                                            <label className="inline-flex p-3 items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </p>


                                        <p className="flex justify-between items-center w-full border-t border-gray-100 text-gray-600 py-1 pl-6 pr-3 hover:bg-gray-100 transition duration-150">
                                            Set timezone automatically using your location
                                            <label className="inline-flex p-3 items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </p>


                                        <p className="w-full border-t text-red-500 border cursor-pointer border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                            Delete my account
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;