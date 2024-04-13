import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const QualifierTimer = (props) => {
  const [endTime, setEndTime] = useState(Date.now());
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetch("/api/round0/getTime", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          console.log("TIME----", data.endTime)
          setEndTime(data.endTime);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [status]);

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const targetTime = new Date(endTime).getTime();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      // Target date has passed
      return { minutes: "00", seconds: "00" };
    }

    if (Math.floor(timeDiff / 1000) <= 0) {
      props.autoSubmit();
      location.reload();
    }

    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  });

  return (
    <div className="w-full flex justify-center items-center bg-[#1a1a1a] h-20">
      <div className="flex flex-col justify-center items-center h-full w-fit text-white ">
      <div className="text-2xl">
        Team Name : {props.teamName}
      </div>
        <div className="flex justify-evenly h-full w-full text-xl">
          <div className="flex flex-col items-center">
            <div className="flex flex-col">{timeRemaining.minutes}</div>
            MINS
          </div>
          <span>:</span>
          <div className="flex flex-col items-center">
            <div className="flex flex-col">{timeRemaining.seconds}</div>
            SECS
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualifierTimer;
