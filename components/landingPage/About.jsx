import React from "react";
import Image from "next/image";
import logo from "@/public/assets/logos/esummitLogo.svg";

const About = () => {
  return (
    // <div className="text-center shadow-md rounded-lg p-8 text-white border-gradient-to-b from-blue-500 to-purple-500 border-2 mx-24">
    //     <h2 className="text-4xl font-black mb-2">About E-Summit'24</h2>
    //     <p className="text-gray-700">
    //         E-Summit is the conclave that opens the doors to the world of
    //         entrepreneurship. Masquerading as a single event, it is a fusion of
    //         visionary activities and insightful sessions that open the realm of
    //         networking and broaden the horizon of business in students' minds. With
    //         its exclusive class of exhilarating events, interesting workshops,
    //         exciting expos and spectacular speakers, E-Summit aims at instilling
    //         innovation in young minds.
    //     </p>

    // </div>
    <div id="about" class="sm:px-5 md:px-20 flex bg-[#0E0E0E] items-center justify-center font-poppins">
      <div class="h-full w-full rounded-lg bg-gradient-to-b from-[#ffffff00] via-[#fefab730] to-[#d69a3f20] p-1 border-2 border-[#D6993F] m-12">
        <div class=" h-full w-full items-center justify-center bg-gray-800 back p-4 sm:p-8 text-center text-white bg-transparent">
          <div class="flex justify-center">
            <Image
              src={logo}
              alt="E-Summit Logo"
              className="item-center h-[20vh]"
            />
          </div>
          <h1 class="text-2xl md:text-4xl font-black p-4">
            About E-Summit&apos;24
          </h1>
          <p className="">
            E-Summit is the conclave that opens the doors to the world of
            entrepreneurship. Masquerading as a single event, it is a fusion of
            visionary activities and insightful sessions that open the realm of
            networking and broaden the horizon of business in students&apos;
            minds. With its exclusive class of exhilarating events, interesting
            workshops, exciting expos and spectacular speakers, E-Summit aims at
            instilling innovation in young minds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
