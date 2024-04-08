import React from "react";
import IIACard from "./IIACard";
import actuate from "@/public/assets/landingPage/IIA/actuate.svg";
import ideate from "@/public/assets/landingPage/IIA/ideate.svg";
import innovate from "@/public/assets/landingPage/IIA/innovate.svg";

export const IIA = () => {
  const data = [
    {
      img: innovate,
      title: "Innovate",
      description:
        "Provide a unique and workable concept to stand out from the competitors.",
    },
    {
      img: ideate,
      title: "Ideate",
      description:
        "Generate and explore creative ideas to solve a problem or achieve a goal.",
    },
    {
      img: actuate,
      title: "Actuate",
      description:
        "Execute a well-planned strategy or solution with precision and agility",
    },
  ];
  const cards = data.map((item) => (
    <IIACard key={item.title} img={item.img} title={item.title} description={item.description} />
  ));
  return <section className="flex flex-col bg-[#0E0E0E] items-center md:flex-row w-full justify-around px-10 gap-5">{cards}</section>;
};
