"use client";

import { useEffect, useState } from "react";
// import LeaderDashboardCards from "./LeaderDashboardCards";
import Card from "@/components/Card";
import DeleteTeamButton from "@/components/DeleteTeamButton";
import boardImg from "@/public/assets/boardpics/image2.svg";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader";

export default function LeaderDashboard() {
  const [popUpForDelete, setPopUpForDelete] = useState(false);
  const [popUpForRemove, setPopUpForRemove] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [remove, setRemove] = useState(false);
  const [id, setId] = useState();
  const [teamId, setTeamId] = useState("");
  const [teamLeaderId, setTeamLeaderId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamMembersData, setTeamMemberData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQualified, setIsQualified] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      getUserData();
      fetchDataFromBackend();
    }
  }, [status, router]);

  const getUserData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
        if (user.hasFilledDetails == true) {
          if (user.events.includes(2)) {
            if (user.event2TeamId == null) {
              router.push("/events/event2/makeTeam");
            } else {
              if (user.event2TeamRole == 1) {
                router.push("/events/event2/memberDash");
              } else {
                setIsLoading(false);
              }
            }
          } else {
            toast.error("Please register the Event first");
            router.push("/");
          }
        } else {
          router.push("/userDetails");
        }
      });
  };

  const fetchDataFromBackend = () => {
    setIsLoading(true);
    fetch("/api/event2/getTeamData", {
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
        console.log("dataa", data);
        setTeamId(data.teamDetails._id);
        setTeamMemberData(data.teamDetails.members);
        setTeamName(data.teamDetails.teamName);
        setTeamLeaderId(data.teamDetails.teamLeaderId);
        setIsQualified(data.teamDetails.isQualified);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  function toggleDelete() {
    setDeleted(!deleted);
  }
  function toggleRemove() {
    setRemove(!remove);
  }
  function togglePopUpForRemove() {
    setPopUpForRemove(!popUpForRemove);
  }
  function togglePopUpForDelete() {
    setPopUpForDelete(!popUpForDelete);
  }
  function removeMember(id) {
    setRemove((prev) => !prev);
    console.log("id", id);
    setIsLoading(true);
    fetch(`/api/event2/removeMember/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //location.reload();
        setIsLoading(false);
      })
      .then(() => {
        setRemove(!remove);
        location.reload();
        toast.success("Member removed successfully.");
      });
  }

  function deleteTeam() {
    if (teamMembersData.length !== 1) {
      toast.error("First remove all other members.");
      return;
    }
    setIsLoading(true);
    setDeleted(!deleted);
    fetch(`/api/event2/deleteTeam/${teamId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {})
      .then(() => {
        // router.push('/events/event2/makeTeam');
        toast.success("Team Deleted.");
        window.location.href = "/mySchedule";
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong.");
        setIsLoading(false);
      });
  }

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen py-10"
      // style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}
    >
      {isLoading && <Loader />}

      <div className="max-w-screen-xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 mt-8 text-white">
          Team : {teamName}
        </h1>

        {teamMembersData.length < 3 && (
          <div
            style={{ backgroundColor: "#141B2B" }}
            className="p-2 outline outline-slate-700 outline-2 rounded-md mb-5"
          >
            <p className="text-white">
              I understand that if the team I have created does not meet the
              minimum requirement of 3 members per team before the end of
              registrations, random members who&lsquo;ve registered would be
              added to my team
            </p>
          </div>
        )}
        {teamMembersData.length < 4 && (
          <Link
            className="text-black bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] hover:bg-gradient-to-br hover:from-amber-400 hover:via-amber-200 hover:to-yellow-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'"
            href="/events/event2/teamCode"
          >
            {" "}
            Add Members{" "}
          </Link>
        )}
        <div className="flex flex-wrap justify-center">
          {teamMembersData.map((el) => {
            return (
              <div key={el.name}>
                <Card
                  name={el.name}
                  Role={el.event2TeamRole === 0 ? "Leader" : "Member"}
                  regNo={el.regNo}
                  phone={el.mobNo}
                  leader={true}
                  removeMember={() => {
                    removeMember(el._id);
                  }}
                  imageSrc={boardImg}
                />
              </div>
            );
          })}

          {/* </div> */}
          {/* <div className="flex flex-wrap justify-center mt-4"> */}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {/* <button
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => {
            router.push("/levels/qualifier");
          }}
        >
          Start Quiz
        </button> */}

        <DeleteTeamButton onClick={() => deleteTeam()} />

        {/* {isQualified && (
          <div className="flex flex-col text-white items-center border p-2 rounded-xl my-2">
            <h1 className="text-lg font-bold">
              Congratulations! Your team has been shortlisted for the
              main round of Futurepreneurs 9.0.
            </h1>
            <h6 className="font-bold">See you at the event!</h6>
            <h6>Date : 19 January 2024</h6>
            <h6>Reporting Time : 9 AM</h6>
            <h6>Venue : Sarojini Naidu Hall, SJT</h6>
          </div>
        )} */}
        <Toaster />
      </div>
    </div>
  );
}
