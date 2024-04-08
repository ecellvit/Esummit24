import Image from "next/image";
import scheduleDetails from "./scheduleDetails";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import RegisterButton from "@/components/events/RegisterButton";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

export default function Schedule({ scheduleRef }) {
  const { data: session, status } = useSession();
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDeatials] = useState(null);
  const [event2Reg, setEvent2Reg] = useState(false);
  const [event1Reg, setEvent1Reg] = useState(false);
  useEffect(() => {
    fetch("/api/userDetails", {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDeatials(data);
      })
      .catch((err) => {
        userDetails.user.events = [];
      });
  }, []);
  return (
    <section
      id="schedule"
      ref={scheduleRef}
      className="bg-black min-h-screen flex flex-col justify-center items-center"
    >
      {loader && <Loader />}
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="uppercase mt-10 mb-5 text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          schedule
        </h1>
        <p className="w-2/3 text-sm md:text-md  text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. z
        </p>
      </div>
      <div className="flex flex-col justify-center items-center m-2">
        {scheduleDetails.map((ele, index) => {
          return (
            <div key={ele.id} className="flex justify-center items-center">
              <div className="hidden md:flex flex-col md:flex-row w-3/4 justify-evenly text-white mb-4 m-2 md:m-8 md:p-2 items-center">
                {index % 2 === 0 && (
                  <div className="border-2 border-solid border-yellow-500 h-1/6 md:h-1/5 rounded-lg overflow-hidden">
                    <Image
                      className="object-fit max-h-full"
                      src={ele.image}
                      alt={"Event: " + ele.eventName}
                    />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, translateY: 100 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-1/2 text-wrap m-2 md:m-0"
                >
                  <div className="text-sm md:text-xl font-bold">
                    {ele.date}{" "}
                    <span className="text-sm font-normal">
                      {"( " + ele.time + " )"}
                    </span>
                    <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">
                      {ele.eventName}
                    </div>
                  </div>
                  <p className="font-extralight">{ele.description}</p>
                  <p className="font-extralight my-1">
                    <span className="font-normal">Venue: </span>
                    {ele.venue}
                  </p>
                  <div className="flex gap-4">
                    <RegisterButton
                      loader={loader}
                      setLoader={setLoader}
                      event={ele.id}
                      token={session?.accessTokenBackend}
                      setEvent1Reg={setEvent1Reg}
                      setEvent2Reg={setEvent2Reg}
                    />
                    {(ele.id === 1 || ele.id === 2) &&
                      (userDetails?.user?.events?.includes(ele.id) ||
                        (ele.id == 1 && event1Reg) ||
                        (ele.id == 2 && event2Reg)) && (
                        <button
                          className="text-black font-semibold hover:scale-105 transition-all bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-2 rounded-lg hover:bg-opacity-80"
                          onClick={() => {
                            window.location.href = `/events/event${ele.id}/memberDash`;
                          }}
                        >
                          Go to Dashboard
                        </button>
                      )}
                  </div>
                </motion.div>
                {index % 2 !== 0 && (
                  <div className="border-2 border-solid border-yellow-500 h-1/6 md:h-1/5 rounded-lg overflow-hidden">
                    <Image
                      className="object-fit max-h-full"
                      src={ele.image}
                      alt={"Event: " + ele.eventName}
                    />
                  </div>
                )}
              </div>
              {/* For smaller screens */}
              <div className="flex flex-col items-center">
                <div className="block md:hidden border-2 border-solid border-yellow-500 w-fit rounded-lg overflow-hidden h-44 mt-10">
                  <Image
                    className="object-fit w-auto h-full"
                    src={ele.image}
                    alt={"Event: " + ele.eventName}
                  />
                </div>
                <div className="md:hidden w-1/2 text-wrap text-center m-2 mt-5">
                  <div className="text-sm md:text-xl font-bold">
                    {ele.date}{" "}
                    <span className="text-sm font-normal">
                      {"( " + ele.time + " )"}
                    </span>
                  </div>
                  <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">
                    {ele.eventName}
                  </div>
                  <p className="font-extralight">{ele.description}</p>
                  <p className="font-extralight my-1">
                    <span className="font-normal">Venue: </span>
                    {ele.venue}
                  </p>
                  <div className="flex flex-col gap-4">
                    <RegisterButton
                      loader={loader}
                      setLoader={setLoader}
                      event={ele.id}
                      token={session?.accessTokenBackend}
                      setEvent1Reg={setEvent1Reg}
                      setEvent2Reg={setEvent2Reg}
                    />
                    {(ele.id === 1 || ele.id === 2) &&
                      (userDetails?.user?.events?.includes(ele.id) ||
                        (ele.id == 1 && event1Reg) ||
                        (ele.id == 2 && event2Reg)) && (
                        <button
                          className="text-black font-semibold hover:scale-105 transition-all bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-2 rounded-lg hover:bg-opacity-80"
                          onClick={() => {
                            window.location.href = `/events/event${ele.id}/memberDash`;
                          }}
                        >
                          Go to Dashboard
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
