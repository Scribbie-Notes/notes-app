/** @format */

import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
	return (
		<div className="border border-richblack-600 text-richblack-300 rounded-xl md:p-7 p-4 lg:p-14 flex gap-3 flex-col mx-auto lg:ml-[5.5rem] lg:mr-[5.5rem] sm:w-[90%] w-[95%] h-auto mb-10">
			<h1 className="text-4xl leading-10 font-semibold text-richblack-5">
				Got a Idea? We&apos;ve got the skills. Let&apos;s team up
			</h1>
			<p className="">
				Tell us more about yourself and what you&apos;re got in mind.
			</p>

			<div className="mt-7 -mb-20">
				<ContactUsForm  />
			</div>
		</div>
	);
};

export default ContactForm;
