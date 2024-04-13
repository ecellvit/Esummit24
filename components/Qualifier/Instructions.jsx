"use client";
import time from "@/constant/round0/time";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcons from "react-loading-icons";
import Link from "next/link";
import formLinks from "@/constant/round0/form";

const Instructions = () => {
  console.log(formLinks);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();

    const targetTime = new Date(
      2024,
      3,
      time.quizStartTime.day,
      time.quizStartTime.hour,
      time.quizStartTime.minute,
      time.quizStartTime.second
    );
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      // Target date has passed
      setButtonEnabled(true);
      return { minutes: "00", seconds: "00", hours: "00" };
    }

    if (Math.floor(timeDiff / 1000) <= 0) {
      console.log("asdf");
    }

    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  const [form, setForm] = useState(-1);
  useEffect(() => {
    setLoading(true)
    fetch("/api/event1/getForm", {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("\n\n\n\n\n\n\n\n", data);
        console.log(data.user.linkNumber);
        setForm(data.user.linkNumber);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    // if early then disable button

    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const startQuiz = () => {
    console.log("inside");
    setLoading(true);
    fetch("/api/round0/startQuiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log("inside response", res);
        console.log(res.status);
        if (res.status === 200) {
          console.log("quizStartingNow.");
          location.reload();
        } else if (res.status === 403) {
          toast.error("Quiz has not started yet");
        } else {
          toast.error("too late");
        }
        setLoading(false);
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="min-h-[100vh] text-white flex flex-col items-center">
      <div className="flex flex-col items-start w-[90vw] px-8 py-4 border rounded-xl m-2">
        <p>
          Welcome to the Qualifying round of Innoventure! The quiz is designed
          to assess your knowledge and skills. To successfully qualify, you must
          answer the questions with accuracy and precision.
        </p>
        <br />
        <p>
          Read the following instructions carefully to ensure a smooth and
          successful completion of the quiz.
        </p>
        <ul className="list-inside list-disc">
          <li>
            The quiz is only <span className="text-red-400">16 mins</span> long
            and can only be accessed using the button given below.
          </li>
          <li>
            The Quiz will{" "}
            <span className="text-red-400">
              stop accepting responses at 10:30 PM
            </span>
            , and hence maximum you can start the quiz is by 10:10 PM.
          </li>
          <li>
            The quiz contains{" "}
            <span className="text-red-400">only Single Choice Correct</span>{" "}
            questions. Be careful when you choose answers.
          </li>
          <li>
            If you feel the answer is not given in the questions, you can choose
            the option closest to what you think is correct.
          </li>
          <li>
            <span className="text-red-400">Only one response per team</span>{" "}
            will be accepted, quiz link would be visible only on the team
            leader&apos;s dashboard.
          </li>
          <li className="text-red-400">
            Make sure that the form is opened using the same account / email ID
            from which the leader had logged in and registered for the event.
          </li>
          <li className="text-red-400">
            In case of a submission form a mail ID that is different from the
            mail ID that was used to register will lead to immediate
            disqualification.
          </li>
        </ul>
      </div>
      <div>
        {form !== -1 && (
          <Link href={formLinks[form]}>
            <button
              className={`px-4 py-2 rounded-full text-black bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none m-4 w-full h-12 flex items-center justify-center font-bold hover:opacity-80 hover:cursor-pointer`}
              // onClick={() => startQuiz()}
            >
              {/* {loading ? <LoadingIcons.Oval height={"20px"} /> : "Start Quiz"} */}
              {loading ? "Loading..." : "Start Quiz"}
            </button>
          </Link>
        )}
      </div>
      <Toaster />
    </main>
  );
};

export default Instructions;
