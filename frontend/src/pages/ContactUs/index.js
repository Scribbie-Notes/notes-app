/** @format */

import React from "react";

import Footer from "../../components/Footer"
import ContactDetails from "./ContactDetails"
import ContactForm from "./ContactForm"

const Contact = () => {
	return (
		<div>
			<div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col lg:items-start items-center lg:justify-between  gap-10 text-white lg:flex-row">
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
