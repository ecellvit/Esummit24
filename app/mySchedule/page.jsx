"use client";
import scheduleDetails from "@/components/landingPage/Schedule/scheduleDetails";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ScheduleRegisterButton from "@/components/events/ScheduleRegisterButton";
import Loader from "@/components/Loader";
import Event from "./Event";

// const page = () =>

const MySchedule = () => {
  const [regEvent, setRegEvents] = useState([]);
  const [regEventsList, setRegEventsList] = useState([]);
  const [userDetails, setUserDeatials] = useState(null);
  const [loader, setLoader] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    setLoader(true);
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
        setRegEventsList(
          scheduleDetails.filter((event) =>
            data?.user?.events?.includes(event.id)
          )
        );
        setLoader(false);
      });
  }, []);

  const events = regEventsList.map((event) => {
    return <Event key={event.id} event={event} userDetails={userDetails}/>;
  });

  return (
    <section className="items-center-20 text-white min-h-screen bg-[#0E0E0E] font-poppins px-10 sm:px-16 md:px-20">
      {loader ? (
        <Loader />
      ) : userDetails?.user?.events.length === 0 ||
        status === "unauthenticated" ? (
        <div className="flex flex-col min-h-[calc(100vh-5rem)] gap-10 items-center justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl capitalize">
            No events registered
          </h1>
          <button
            className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 border-[#FEFAB7] bg-transparent hover:scale-105 transition-all"
            onClick={() => {
              window.location.href = "/#schedule";
            }}
          >
            Register Now
          </button>
        </div>
      ) : (
        <>
          <h1 className="pt-20 uppercase text-center mt-10 mb-5 text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
            my schedule
          </h1>
          <div className="flex flex-col gap-10 pb-10">{events}</div>
        </>
      )}
    </section>
  );
};

export default MySchedule;
