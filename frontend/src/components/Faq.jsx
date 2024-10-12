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
      question: "Q. What is Scribbie?",
      answer: "Scribbie is a powerful, intuitive note-taking website designed specifically for working professionals. It helps you manage your notes seamlessly and effectively, making it easy to stay organized and focused.",
    },
    {
      question: "Q. How do I get started with Scribbie?",
      answer: "Getting started with Scribbie is easy! Simply sign up for an account on our website, and you can start taking notes right away. Explore the features and customize your experience to fit your needs.",
    },
    {
      question: "Q. How does Scribbie help with note management?",
      answer: "Scribbie allows you to categorize and tag your notes for quick retrieval, making it easy to find information when you need it. The intuitive interface ensures you can organize your notes in a way that suits your personal workflow.",
    },
    {
      question: "Q. Can I access Scribbie on multiple devices?",
      answer: "Yes! Scribbie is a web-based application, so you can access your notes from any device with an internet connection. Your notes are automatically synced, ensuring you have access wherever you are.",
    },
    {
      question: "Q. Is my data secure on Scribbie?",
      answer: "Yes, we take data security seriously. Scribbie uses encryption and other security measures to protect your notes and ensure that your information is safe and private.",
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
