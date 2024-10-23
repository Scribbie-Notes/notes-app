import React, { useRef,useEffect, useState } from "react";
import Navbar from "../Navbar";
import { MdFacebook } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const Contact = () => {
  const [data, setData] = useState({
		first_name: "",
		last_name: "",
		user_email: "",
		message: "",
  });
  
  const changeHandler = (e) => {
    setData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("FORM DATA----: ");
    console.log(data);
    if (!data.user_email || !data.first_name || !data.message) {
      toast.error("All Fields are required:)");
      return;
    }
    const id = toast.loading("Loading..");
    const response = await axiosInstance.post("/contact", {
     data
    });

    // handle successful registration response
    if (response.data.error) {
      toast.error("Failed submission");
      return;
    }
    console.log("CONTACT US RESPONSE---");
    console.log(response);
    toast.dismiss(id);
    toast.success("Will connect to you soon");
    setData({ first_name: "", last_name: "", user_email: "", message: "" });
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  })
  const form = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
		<div>
			<Navbar userInfo={user} />
			<div className="contact-section  flex px-16 gap-x-10 py-10 h-[580px]">
				<div className="w-2/6 bg-slate-800  p-6 text-white flex  flex-col gap-y-5  shadow-[inset_0_-10px_15px_0_rgba(255,255,255,0.5)]">
					<h1 className="text-xl">Get in touch</h1>
					<div>
						<h1>Visit us</h1>
						<p className="text-sm">Come say hello at our office HQ.</p>
						<p className="text-sm font-bold">
							67 Wistoria Way Croydon South VIC 3136 AU
						</p>
					</div>
					<div>
						<h1>Chat to us</h1>
						<p className="text-sm">Our friendly team is here to help.</p>
						<p className="text-sm font-bold">@Scribbie.com</p>
					</div>
					<div>
						<h1>Call us</h1>
						<p className="text-sm">Mon-Fri from 8am to 5pm</p>
						<p className="text-sm font-bold">(+995) 555-55-55-55</p>
					</div>
					<div>
						<h1>Social media</h1>
						<div className="flex gap-x-3">
							<span>
								<MdFacebook />
							</span>
							<span>
								<FaLinkedin />
							</span>
							<span>
								<IoLogoInstagram />
							</span>
							<span>
								<FaXTwitter />
							</span>
						</div>
					</div>
				</div>
				<div className=" w-4/6">
					<form
						onSubmit={submitHandler}
						ref={form}
						className="flex flex-col gap-y-10 px-16">
						<div className="flex gap-x-5">
							<div className="flex flex-col w-3/6 gap-y-2">
								<label>First Name</label>
								<input
									type="text"
									name="first_name"
									value={data.first_name}
									onChange={changeHandler}
									className="border border-black border-solid rounded h-8 pl-3 placeholder-black"
									placeholder="Random first"
								/>
							</div>
							<div className="flex flex-col w-3/6 gap-y-2">
								<label>Last Name</label>
								<input
									type="text"
									name="last_name"
									value={data.last_name}
									onChange={changeHandler}
									className="border border-black border-solid rounded h-8 pl-3 placeholder-black"
									placeholder="Random last"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-y-2">
							<label>Email</label>
							<input
								type="email"
								name="user_email"
								value={data.user_email}
								onChange={changeHandler}
								className="border border-black border-solid rounded h-8 pl-3 placeholder-black"
								placeholder="random@gmail.com"
							/>
						</div>
						<div className="flex flex-col gap-y-2">
							<label>Message</label>
							<textarea
								name="message"
								value={data.message}
								onChange={changeHandler}
								className="border border-black border-solid rounded h-24 pl-3 pt-3 placeholder-black resize-none"
								placeholder="Tell us what we can help you with"
							/>
						</div>
						<div className="flex items-center">
							<input
								type="checkbox"
								id="subscribe"
								name="subscribe"
								className="mr-2"
							/>
							<label
								htmlFor="subscribe"
								className="text-sm">
								I&#39;d like to receive more information about company. I
								understand and agree to the{" "}
								<span className="text-gray-500 font-bold">Privacy Policy</span>
							</label>
						</div>
						<input
							type="submit"
							value="Send"
							className="bg-slate-800 text-white rounded cursor-pointer h-8"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
