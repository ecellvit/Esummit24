import { VerticalTimeline, VerticalTimelineElement } from "./index";
import "./style.css";
import scheduleDetails from "./scheduleDetails";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RegisterButton from "@/components/events/RegisterButton";

const Timeline = ({ scheduleRef, caps }) => {
  const [loader, setLoader] = useState(false);
  const { data: session, status } = useSession();
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
  const timeline = scheduleDetails.map((event, idx) => (
    <VerticalTimelineElement
      key={event.id}
      className="vertical-timeline-element--work"
      contentStyle={{
        boxShadow: "none",
        backgroundColor: "transparent",
        color: "#fff",
      }}
      contentArrowStyle={{ opacity: 0 }}
      date={
        <div
          className={`flex flex-col  ${
            idx % 2 == 0 ? "xl:items-start" : "xl:items-end"
          }`}
        >
          <p className="text-justify">{event.description}</p>
          <div className="flex gap-3 py-2">
            {caps &&
            caps["event" + event.id] === true &&
            !userDetails?.user?.events?.includes(event.id) ? (
              <div className="text-white font-semibold text-lg">
                Registrations Closed
              </div>
            ) : (
              <RegisterButton
                loader={loader}
                setLoader={setLoader}
                event={event.id}
                token={session?.accessTokenBackend}
                setEvent1Reg={setEvent1Reg}
                setEvent2Reg={setEvent2Reg}
                existingUserDetails={userDetails}
                setExsitingUserDetials={setUserDeatials}
              />
            )}

            {(event.id === 1 || event.id === 2) &&
              (userDetails?.user?.events?.includes(event.id) ||
                (event.id == 1 && event1Reg) ||
                (event.id == 2 && event2Reg)) && (
                <button
                  className="text-black font-semibold hover:scale-105 transition-all bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-2 rounded-lg hover:bg-opacity-80"
                  onClick={() => {
                    window.location.href = `/events/event${event.id}/memberDash`;
                  }}
                >
                  Go to Dashboard
                </button>
              )}
          </div>
        </div>
      }
      iconStyle={{ background: "white", scale: 0.5, color: "#fff" }}
    >
      <div className="my-4 font-poppins">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold ${
            idx % 2 == 0 ? "xl:text-right" : "xl:text-left"
          }`}
        >
          {event.date}
        </h1>
        <h1
          className={`uppercase text-3xl sm:text-4xl md:text-5xl font-bold ${
            idx % 2 == 0 ? "xl:text-right" : "xl:text-left"
          } bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent`}
        >
          {event.eventName}
        </h1>
        <h1
          className={`uppercase text-base sm:text-base md:text-lg ${
            idx % 2 == 0 ? "xl:text-right" : "xl:text-left"
          }`}
        >
          {event.venue}
        </h1>
        <h1
          className={`uppercase text-base sm:text-base md:text-lg ${
            idx % 2 == 0 ? "xl:text-right" : "xl:text-left"
          }`}
        >
          {event.time}
        </h1>
      </div>
    </VerticalTimelineElement>
  ));
  return (
    <section
      id="schedule"
      ref={scheduleRef}
      className="bg-[#0E0E0E] min-h-screen flex flex-col justify-center items-center"
    >
      {loader && <Loader />}
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="uppercase mt-10 mb-5 text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          schedule
        </h1>
        <p className="w-2/3 text-sm md:text-lg  text-center font-poppins text-white">
          Welcome to E-Summit 2024! Dive into a world of unparalleled
          opportunities with our meticulously planned events and sessions,
          designed to keep you motivated and engaged throughout the fest.
        </p>
      </div>
      <div className="pt-10 w-full">
        <VerticalTimeline animate={true}>{timeline}</VerticalTimeline>
      </div>
    </section>
  );
};

export default Timeline;
