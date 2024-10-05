import React from 'react';

const Testimonial = () => {
    return (
        <div>
            <section className="bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-6 py-12 mx-auto">
                    <div className="grid items-start gap-4 xl:grid-cols-5">
                        <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
                            <h2 className="text-4xl font-extrabold">Hear from Our Happy Customers</h2>
                            <p className="dark:text-gray-600">Genuine Feedback from Those Who Know Us Best.</p>
                            <img src="/testimonial-section.png" alt="testimonial review" height={0} width={550}/>
                        </div>
                        <div className="p-6 xl:col-span-3 xl:ml-8">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid content-center gap-4">
                                    <div className="p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200 dark:bg-gray-50">
                                        <p className="testimonial-text">"Since I started using this notes application, my productivity has skyrocketed. The intuitive design and seamless syncing across devices make it an essential tool for organizing my thoughts and tasks. The powerful search functionality ensures I can always find what I need, and the ability to collaborate with others has transformed the way I work on projects. It’s truly a game-changer for anyone looking to stay organized and efficient."</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <img src="https://i.pinimg.com/736x/a8/9f/67/a89f67343169f2a76369d2df3b364875.jpg" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                            <div>
                                                <p className="text-lg font-semibold">Leroy Jenkins</p>
                                                <p className="text-sm dark:text-gray-600">CTO of Company Co.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200 dark:bg-gray-50">
                                        <p className="testimonial-text">"With this notes app, staying organized is a breeze. Its user-friendly interface and powerful features make it an essential tool. Perfect for managing tasks and capturing ideas on the go. Highly recommended!"</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <img src="https://i.pinimg.com/736x/a8/9f/67/a89f67343169f2a76369d2df3b364875.jpg" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                            <div>
                                                <p className="text-lg font-semibold">Kendrick Lamar</p>
                                                <p className="text-sm dark:text-gray-600">CEO of Oklama</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid content-center gap-4">
                                    <div className="p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200 dark:bg-gray-50">
                                        <p className="testimonial-text">"This notes application is a game-changer. It simplifies task management and boosts productivity. Its intuitive design and robust features make organizing notes effortless, ensuring I never miss a detail. Highly recommended!"</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <img src="https://i.pinimg.com/736x/a8/9f/67/a89f67343169f2a76369d2df3b364875.jpg" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                            <div>
                                                <p className="text-lg font-semibold">Drake</p>
                                                <p className="text-sm dark:text-gray-600">CTO of OVO Company</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-lg shadow-md hover:shadow-xl cursor-default transition duration-300 ease-in-out border border-gray-200 dark:bg-gray-50">
                                        <p className="testimonial-text">"I've tried many note-taking apps, but this one stands out for its simplicity and functionality. The ability to categorize and tag notes makes retrieval a breeze, and the collaborative features have been invaluable for team projects. The app’s reliability and ease of use have made it an essential part of my daily routine, helping me stay on top of my tasks and ideas effortlessly."</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <img src="https://i.pinimg.com/736x/a8/9f/67/a89f67343169f2a76369d2df3b364875.jpg" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                            <div>
                                                <p className="text-lg font-semibold">Martin Garrix</p>
                                                <p className="text-sm dark:text-gray-600">CEO of Spotify</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
