import React, { useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hero2 from "../../assets/images/hero2.png";
import { SiTicktick } from "react-icons/si";
import { TbEyeSearch } from "react-icons/tb";
import { FaSync } from "react-icons/fa";
import Testimonial from '../Testimonial';
import Footer from '../Footer';
import Pricing from '../Pricing';
import Faq from '../Faq';
// import ScrollOnTop from '../Scroll-on-top/ScrollOnTop';
import './styles.css';

// Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const heroText = useRef();
    const heroParagraph = useRef();
    const getStartedButton = useRef(); // Ref for the button
    const featureCards = useRef([]);
    const sectionRef = useRef();
    const whiteSectionRef = useRef(); // Ref for the bg-white section

    return (
      <div className="h-full scroll-smooth">
        <Navbar userInfo={user} />

        <section className="bg-white pt-12" ref={whiteSectionRef}>
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 pl-16">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1
                ref={heroText}
                className="max-w-2xl mb-2 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-gray-900"
              >
                Capture Ideas,
              </h1>
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-gray-900">
                Unleash Productivity.
              </h1>
              <p
                ref={heroParagraph}
                className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-800"
              >
                Capture every thought and organize with ease. Unlock your full
                potential with <span className="font-semibold">Scribbie</span>
              </p>
              <Link to="/signup">
                <a
                  ref={getStartedButton} // Add ref to the button
                  href="#"
                  className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  Get Started
                  <svg
                    className="w-5 h-5 ml-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </Link>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex hero-image pr-16 ">
              <img src={hero2} alt="landing-pic" className=''/>
            </div>
          </div>
        </section>

        <section
          ref={sectionRef}
          className="pl-20 pr-20  py-12 mt-8 mb-4"
        >
          <h1 className="section-title text-4xl font-bold text-center text-gray-900">
            Unlock Powerful Features to
          </h1>
          <h1 className="section-title text-4xl font-bold mb-14 text-center text-gray-900">
            Enhance Your Note-Taking Experience
          </h1>
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                ref={(el) => (featureCards.current[0] = el)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border border-gray-200"
              >
                <div className="flex items-center mb-4 gap-3">
                  <SiTicktick className="text-2xl text-gray-900" />
                  <h3 className="text-xl font-bold">Organize Effortlessly</h3>
                </div>
                <p className="text-gray-700">
                  Keep your notes neatly categorized with customizable folders
                  and tags.
                </p>
              </div>

              <div
                ref={(el) => (featureCards.current[1] = el)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border border-gray-200"
              >
                <div className="flex items-center mb-4 gap-3">
                  <TbEyeSearch className="text-2xl text-gray-900" />
                  <h3 className="text-xl font-bold">Search with Ease</h3>
                </div>
                <p className="text-gray-700">
                  Quickly find any note with a powerful, real-time search
                  engine.
                </p>
              </div>

              <div
                ref={(el) => (featureCards.current[2] = el)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border border-gray-200"
              >
                <div className="flex items-center mb-4 gap-3">
                  <FaSync className="text-2xl text-gray-900" />
                  <h3 className="text-xl font-bold">Sync Across Devices</h3>
                </div>
                <p className="text-gray-700">
                  Seamlessly sync your notes between all your devices.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Testimonial />
        <Pricing />
        <Faq />
        <Footer />
        {/* <ScrollOnTop /> */}
      </div>
    );
}

export default Hero;
