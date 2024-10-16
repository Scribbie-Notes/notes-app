/** @format */

import React from "react";

import Footer from "../../components/Footer"
import ContactDetails from "./ContactDetails"
import ContactForm from "./ContactForm"
import Navbar from "../../components/Navbar";

const Contact = () => {
	return (
		<div className="bg-richblack-900 w-[100vw] h-auto mt-[-100px] pt-[100px] ">
			<Navbar />
			<div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col lg:items-start items-center lg:justify-between  gap-10 text-white lg:flex-row mb-[100px]">
				<div className="lg:w-[30%] w-{80%}">
					<ContactDetails />
				</div>

				<div className="lg:w-[60%] md:-[80%] w-[95%]">
					<ContactForm />
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Contact;
