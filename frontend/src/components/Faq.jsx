import React, { useState } from "react";
import Cross from "../assets/images/cross.svg";

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="rounded-lg mb-4 w-[70%] mx-auto transition-shadow duration-300">
      <div
        className={`flex items-center justify-between text-xl font-medium cursor-pointer bg-white md:p-4 2xl:p-6 transition duration-300 ease-in-out border-b-2 ${
          isOpen
            ? "border-black shadow-lg"
            : "border-transparent shadow-md hover:shadow-lg"
        }`}
        onClick={onToggle}
      >
        <span>{question}</span>
        <img
          src={Cross}
          alt="Toggle"
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
        />
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out hover:shadow-lg ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div
          className={`p-6 md:text-md 2xl:text-xl shadow-md font-medium bg-white`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Q. Question1",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat magna, faucibus sed aliquam gravida, laoreet sed tortor. Suspendisse pellentesque feugiat dui, id dapibus nunc. Fusce tempus, lectus nec egestas pretium, ex nibh fringilla nibh, sit amet efficitur odio leo sit amet nibh. Proin eget magna neque. Vestibulum non dolor eget neque mattis porta efficitur a mauris. Donec posuere tellus ultricies eleifend finibus.",
    },
    {
      question: "Q. Question2",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat magna, faucibus sed aliquam gravida, laoreet sed tortor.",
    },
    {
      question: "Q. Question3",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat magna, faucibus sed aliquam gravida, laoreet sed tortor. Suspendisse pellentesque feugiat dui, id dapibus nunc. Fusce tempus, lectus nec egestas pretium, ex nibh fringilla nibh, sit amet efficitur odio leo sit amet nibh.",
    },
    {
      question: "Q. Question4",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Q. Question5",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat magna, faucibus sed aliquam gravida, laoreet sed tortor. Suspendisse pellentesque feugiat dui, id dapibus nunc. Fusce tempus, lectus nec egestas pretium, ex nibh fringilla nibh, sit amet efficitur odio leo sit amet nibh.",
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-neutral-100 text-center rounded-2xl p-8">
      <h1 className="text-4xl mb-6 font-extrabold text-black">
        Frequently Asked Questions
      </h1>
      <div className="container mx-auto flex flex-col items-center justify-center text-left">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
