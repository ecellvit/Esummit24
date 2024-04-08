"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcons from "react-loading-icons";

const MakeTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [showConsent, setShowConsent] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      //Checks if session is not ready and redirects to root.

      router.push("/");
    } else if (status === "authenticated") {
      // toast.success("Logged In");
      getUserData();
    }
  }, [status, router]);

  const getUserData = () => {
    fetch(`/api/userDetails`, {
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
        const user = data.user;
        setShowConsent(user.event2Consent);
        if (user.hasFilledDetails == true) {
          if (user.events.includes(2)) {
            if (user.event2TeamId) {
              const redirect =
                user.event2TeamRole == 1
                  ? "/events/event2/memberDash"
                  : "/events/event2/leaderDash";
              router.push(redirect);
            }
          } else {
            toast.error("Please Register the Event first");
            router.push("/events/event2");
          }
        } else {
          router.push("/userDetails");
        }
      });
  };

  const handleCreateTeam = async () => {
    setIsLoading(true);
    if (teamName.trim().length === 0) {
      toast.error("Team name cannot be empty.");
      setIsLoading(false);
      return;
    }

    try {
      // Send a request to the backend to check if the team name is unique
      const response = await fetch("/api/event2/createTeam", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamName: teamName }),
      });

      const data = await response.json();

      if (data.message == "User Already Part of a Team") {
        // show toast
        toast.error(
          "User already part of Team, please delete that team first."
        );
      } else if (data.status == 405) {
        toast.error("Team name already used. Please choose a different name.");
        setIsLoading(false);
      } else {
        // Team name is unique, so redirect to TeamCode page
        router.push("/events/event2/leaderDash");
      }
      // else {
      //  // Team name is already used, display an error message
      //  alert('Team name already used. Please choose a different name.');
      //}
    } catch (error) {
      setIsLoading(false);
      console.log("Error creating team:", error);
    }
  };

  const handleJoinTeam = () => {
    // Redirect to JoinTeam page
    router.push("/events/event2/joinTeam");
  };

  return (
    <div className="bg-[#0E0E0E] bg-cover bg-no-repeat bg-center">
      <Toaster />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-[60%] sm:w-[55vw] flex flex-col items-center justify-around text-white rounded-lg p-2 min-w-fit min-h-[70vh] m-12 border-2 border-[#D6993F]">
          <p className="text-xl sm:text-2xl md:text-4xl font-bold m-2 mb-4 text-center">
            Join or Create a Team
          </p>

          <div className="flex flex-col items-center mx-auto mb-4">
            <button
              className="px-4 py-2 text-black rounded-full capitalize cursor-pointer bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] mt-4 w-full h-12 flex items-center justify-center font-bold"
              onClick={handleJoinTeam}
            >
              Join team with code
            </button>
          </div>

          <div className="border-b border-gray-300 w-5/6 my-1"></div>

          <div className="flex flex-col items-center mx-auto mb-6 ">
            <h1 className="text-lg sm:text-xl md:text-3xl font-semibold mb-4 ">
              Create your team
            </h1>
            <input
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-2 border text-black border-gray-300 rounded"
            />

            <button
              className="px-4 py-2 text-black rounded-full cursor-pointer bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] mt-4 w-full h-12 flex items-center justify-center font-bold"
              onClick={() => handleCreateTeam()}
            >
              {isLoading ? (
                <LoadingIcons.Oval color="black" height={"20px"} />
              ) : (
                "Create Your Own Team"
              )}
            </button>
          </div>
          {!showConsent && (
            <div className="border-b border-gray-300 w-5/6 my-1 mb-4"></div>
          )}
          <div className="m-2">
            {!showConsent && (
              <button
                onClick={() => {
                  router.push("/events/event2/termsConditions");
                }}
                className="text-black bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                I dont have a Team
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeTeam;
