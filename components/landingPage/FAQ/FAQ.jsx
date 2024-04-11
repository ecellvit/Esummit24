import Image from "next/image";
import Accordian from "./Accordian";
import { useState } from "react";
import faqImage from "@/public/assets/landingPage/FAQ/faq.svg";

const FAQ = () => {
  const [showAnsNumber, setShowAnsNumber] = useState(-1);
  const handleClick = (id) => {
    if (id === showAnsNumber) {
      setShowAnsNumber(-1);
    } else {
      setShowAnsNumber(id);
    }
  };

  const faqs = [
    {
      id: 1,
      q: " Will there be any registration fees?",
      ans: ["No, the event is free of cost."],
    },
    {
      id: 2,
      q: "What is the duration of the event?",
      ans: [
        "There are a total of 5 events scheduled within 4 days, each with different duration and venues. Scroll above for the required event details.",
      ],
    },
    {
      id: 3,
      q: "Will ODs be provided for the event?",
      ans: [
        "Yes, ODs will be provided for all events, throughout the duration of the events.",
      ],
    },
    {
      id: 4,
      q: "Will there be cash prize for competitions?",
      ans: [
        "Yes, both the competitions, Ideathon and Innoventure, will have their respective cash prizes. All details will be released on the social media handles.",
      ],
    },
    {
      id: 5,
      q: "Is there a limit for E-talk ?",
      ans: [
        "The limit for E-talk is 1500 people, it’s scheduled for 15th April from 2pm-7pm.",
      ],
    },
    {
      id: 6,
      q: "I still have some doubts regarding the event, how can i get them resolved?",
      ans: [
        "Contact the following POC’s for assistance:",
        "1. Arjun Bector - 9914500336",
        "2. Vaibhav - 8074911266",
        "3. Archi - 9993310304",
        "4. Saket DB- 7387776883",
      ],
    },
  ];

  const faqSection = faqs.map((questionObj) => (
    <Accordian
      key={questionObj.id}
      {...questionObj}
      handleClick={handleClick}
      showAnsNumber={showAnsNumber}
    />
  ));

  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] bg-[#0E0E0E] w-full flex justify-center items-center font-poppins">
      <div className="flex flex-col sm:flex-row gap-10 items-center w-3/4">
        <div className="w-full sm:w-1/2 flex sm:flex-col items-center gap-5 sm:gap-0">
          <div className="text-left">
            <Image className="h-44" src={faqImage} />
            <h1 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
              <h1>Answers To Some</h1>
              <h1>Commonly Asked Questions</h1>
            </h1>
          </div>
        </div>
        <div className="w-full sm:w-1/2 h-full flex flex-col gap-2 items-start">
          {faqSection}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
