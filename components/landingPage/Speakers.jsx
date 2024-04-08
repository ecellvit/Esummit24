import React from "react";
import Image from "next/image";
import image1 from "@/styles/landingPage/image1.png";
import image2 from "@/styles/landingPage/image2.png";
import image3 from "@/styles/landingPage/image3.png";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Card = ({ speaker }) => {
  return (
    <div className="h-fit my-4 mx-10 w-44 md:w-56 flex flex-col gap-4">
      <div className="flex justify-center rounded-lg overflow-hidden">
        <Image className="w-full h-auto" src={speaker.image} />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="uppercase text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          {speaker.name}
        </h1>
        <p className="font-extralight text-slate-100">{speaker.position}</p>
        <div className="flex gap-5 mt-2">
          <Link href={speaker.instagram}>
            {" "}
            <FaInstagram />
          </Link>
          <Link href={speaker.linkedin}>
            {" "}
            <FaLinkedin />
          </Link>
          <Link href={speaker.twitter}>
            {" "}
            <FaTwitter />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Sponsers() {
  const speakers = [
    {
      id: 1,
      name: "Mr. XYZ",
      position: "Chairman, OBH Group",
      image: image1,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 2,
      name: "Mr. XYZ",
      position: "Chairman, OBH Group",
      image: image2,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 3,
      name: "Mr. XYZ",
      position: "Chairman, OBH Group",
      image: image3,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
  ];
  const cards = speakers.map((speaker) => (
    <Card speaker={speaker} key={speaker.id} />
  ));
  return (
    <section id="speakers" className="px-10 md:px-20 bg-[#0E0E0E]">
      <div className="flex items-center pt-10 pb-5 text-center">
        <h1 className="uppercase w-full text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          meet our speakers
        </h1>
        <div className="hidden md:block w-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, delay: 0.5 }}
            className="hidden md:block h-0.5 w-full bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F]"
          ></motion.div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center">
        {cards}
      </div>
    </section>
  );
}
