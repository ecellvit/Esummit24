import React from "react";
import Image from "next/image";
import img1 from "@/public/assets/speakers/img1.jpg";
import img2 from "@/public/assets/speakers/img2.jpg";
import img3 from "@/public/assets/speakers/img3.jpg";
import img4 from "@/public/assets/speakers/img4.jpg";
import img5 from "@/public/assets/speakers/img5.jpeg";
import img6 from "@/public/assets/speakers/img6.jpg";
import img7 from "@/public/assets/speakers/img7.jpg";
import img8 from "@/public/assets/speakers/img8.webp";
import img9 from "@/public/assets/speakers/img9.jpg";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Card = ({ speaker }) => {
  return (
    <div className="h-fit my-4 mx-10 w-44 md:w-56 flex flex-col gap-4">
      <div className="flex justify-center rounded-lg overflow-hidden">
        <Image alt={speaker.name} className="w-full h-auto" src={speaker.image} />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="uppercase text-lg md:text-2xl lg:text-2xl text-center font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          {speaker.name}
        </h1>
        <p className="font-extralight uppercase text-center text-slate-100">
          {speaker.position}
        </p>
        {/* <div className="flex gap-5 mt-2">
          <Link href={speaker.instagram}>
            <FaInstagram />
          </Link>
          <Link href={speaker.linkedin}>
            <FaLinkedin />
          </Link>
          <Link href={speaker.twitter}>
            <FaTwitter />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default function Sponsers() {
  const speakers = [
    {
      id: 1,
      name: "Mr. Ashneer Grover",
      position: "Founder | BharatPe",
      image: img1,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 2,
      name: "Mr. Udit Kumar Goyal",
      position: "COO | Google Cloud India",
      image: img2,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 3,
      name: "Mr. Sunny Garg",
      position: "Co-Founder & CEO | CRIB",
      image: img3,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 4,
      name: "Mr. Vijender Singh Chauhan",
      position: "Drishti IAS | Interviewer",
      image: img4,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 5,
      name: "Dr. Gajendra Purohit",
      position: "Founder | Mathscare",
      image: img5,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 6,
      name: "Mr. Suresh Prabhu",
      position: "Former union minister of Civil Aviation, Railways, Commerce",
      image: img7,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 7,
      name: "Mr. Vivek Atray",
      position: "Co-Founder | playwrite",
      image: img6,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 8,
      name: "Dr. Anil Lamba",
      position: "financial literacy activist",
      image: img8,
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    {
      id: 9,
      name: "cmde vs rawat",
      position: "navy veteran | ex marine commando",
      image: img9,
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
      <div className="flex flex-col md:flex-row justify-around items-start flex-wrap">
        {cards}
      </div>
    </section>
  );
}
