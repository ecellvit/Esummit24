"use client";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";

export default function TermsConditions() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [check, setCheck] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  const getData = () => {
    setIsLoading(true);
    fetch(`api/userDetails`, {
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
        setCheck(user.event2Consent);
        setIsLoading(false);

        // if (user.hasFilledDetails == true) {
        //   if (user.teamId !== null) {
        //     const redirect = user.teamRole=='1' ? '/memberDashboard' : '/leaderDashboard';
        //     router.push(redirect);
        //   } else {
        //     router.push("/makeTeam");
        //   }
        // }
      });
  };

  function consent() {
    setIsLoading(true);
    fetch("/api/event2/consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        consent: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowWhatsapp(true);
        setIsLoading(false);
        // location.reload();
      });
  }

  function disagreeConsent() {
    fetch("/api/event2/consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        consent: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // router.push("/makeTeam")
        location.reload();
      });
  }

  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") {
        //Checks if session is not ready and redirects to root.

        router.push("/");
      } else if (status === "authenticated") {
        // toast.success("Logged In");
        getData();
      }
    }
  }, [status, router]);

  return (
    <div className="min-h-screen w-full bg-[#0e0e0e]">
      {/* <Image src={bg} alt="bgImage" fill className="object-cover z-[-10] w-full min-h-[100vh]" /> */}
      {isLoading && <Loader />}
      <div className="flex flex-col items-center justify-center bg-transparent h-screen max-md:overflow-scroll max-md:max-h-fit ">
        <div className="w-1/2 h-1/2 max-md:h-fit max-md:w-2/3 p-8 flex flex-col justify-around items-center bg-transparent rounded-lg border border-white">
          <p className="text-white text-xl font-bold flex max-md:align-top">
            AGREEMENT!
          </p>
          <p className="text-white flex flex-wrap max-md:text-base">
            I understand that if I do not create a team or join an existing team
            before the end of registrations, I would be added to a random team.
          </p>
        </div>
        <div className="mt-3 w-full flex flex-col justify-center items-center">
          {/* {!check ? ( */}
          {!showWhatsapp && (
            <button
              onClick={() => {
                consent();
              }}
              className="text-black justify-center items-center bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] hover:scale-105 transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              I Agree
            </button>
          )}
          {/* ) : (
            <button
              onClick={() => {
                disagreeConsent();
              }}
              className="text-black bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] hover:scale-105 transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              I Disgree
            </button>
          )} */}

          {showWhatsapp && (
            <div className="w-full flex flex-col justify-center items-center">
              <p className="p-4">
                Join the given whatsapp group for further information about our
                team and how you can contribute.
              </p>
              <Link
                href={"https://chat.whatsapp.com/IATx4u0R2tqF6V4cigNpI7"}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <FaWhatsapp className="w-6 h-6 mr-2" />
                Join WhatsApp Chat
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
