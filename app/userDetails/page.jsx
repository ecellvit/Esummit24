"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import eSummit from "@/public/assets/logos/esummitLogo.svg";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader";

export default function UserDetails() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    window.location.href = "/";
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [regError, setRegError] = useState(true);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleFirstnameChange = (e) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z]/g, ""); // Allow only alphabets
    setFirstName(inputValue);
  };

  const handleLastnameChange = (e) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z]/g, ""); // Allow only alphabets
    setLastName(inputValue);
  };

  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Allow Only numbers
    setMobNo(inputValue.trim());

    // if (isValidInput || input === '') {
    //   setUserPhoneNumber(input);
    //   setPhoneError(''); // Reset error state
    // } else {
    //   setPhoneError('Invalid Phone Number'); // Set error state
    // }
  };

  const handleRegNo = (e) => {
    const inputValue = e.target.value;
    setRegNo(inputValue.toUpperCase());
  };

  const handleSubmit = async () => {
    const regNoNew = document.getElementById("regNo").value;
    const isValidInput = /^[2][0-3][a-zA-Z]{3}\d{4}$/.test(regNoNew.trim());
    if (isValidInput) {
    } else {
      setRegError(true);
    }

    if (mobNo !== "" && regNo !== "") {
      if (mobNo.length === 10) {
        if (isValidInput && regNo.length === 9) {
          setLoader(true);
          try {
            const response = await fetch("/api/userDetails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              Authorization: `Bearer ${session.accessTokenBackend}`,
              "Access-Control-Allow-Origin": "*",
              body: JSON.stringify({
                // firstName,
                // lastName,
                regNo,
                mobNo,
              }),
            });

            if (response.ok) {
              toast.success("Details submitted successfully");
              const eventId = localStorage.getItem("event");
              if (!eventId) setLoader(false);
              if (eventId) {
                localStorage.removeItem("event");
                fetch(`/api/event${eventId}/register`, {
                  content: "application/json",
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessTokenBackend}`,
                    "Access-Control-Allow-Origin": "*",
                  },
                })
                  .then((res) => {
                    if (res.status === 200) {
                      toast.success("Event registered successfully.");
                      setLoader(false);
                      window.location.href = "/mySchedule";
                      return;
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              router.push("/");
            } else {
              toast.error("Failed to save data");
            }
          } catch (error) {
            console.log(error);
            toast.error("Server Error");
          }
        } else {
          toast.error("Please give valid registration number");
        }
      } else {
        toast.error("Please give valid mobile number");
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <main className="min-w-[100vw] min-h-[100vh] flex justify-center items-center bg-[#0E0E0E] pt-4">
      {loader && <Loader />}
      <div className="flex flex-col md:flex-row w-full h-[80vh] md:h-[90vh] justify-evenly items-center">
        <div
          className="hidden md:w-100 h-5/6 md:flex flex-col justify-center px-4 pb-5 pt-3 rounded-3xl border-solid border-2 border-[#D6993F]"
          style={{ backgroundColor: "black" }}
        >
          <Image
            src={eSummit}
            alt="eSummit-Logo"
            className="h-2/3 w-2/3 self-center"
          />
          <div className="text-white text-6xl font-bold flex flex-col items-center">
            E-SUMMIT&apos;24
          </div>
        </div>

        <div
          className="w-4/5 md:w-1/2 h-5/6 flex flex-col justify-evenly md:justify-around items-start rounded-3xl px-4 border-solid border-2 border-[#D6993F]"
          style={{ backgroundColor: "black" }}
        >
          <div className="flex justify-start items-center">
            <h1 className="text-3xl text-white font-bold">
              Enter Your Information
            </h1>
          </div>

          <form id="registrationForm" className="shadow-md rounded w-full">
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold font-poppins"
                htmlFor="name"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstnameChange}
              ></input>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold  font-poppins"
                htmlFor="name"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastnameChange}
              ></input>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold "
                htmlFor="regNo"
              >
                Registration Number
              </label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="regNo"
                type="text"
                placeholder="Registration Number"
                value={regNo}
                onChange={(e) => {
                  // setRegNo(e.target.value);
                  handleRegNo(e);
                }}
              ></input>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold "
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={mobNo}
                onChange={handlePhoneNumber}
              ></input>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleSubmit}
                className="text-black bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] hover:bg-gradient-to-br hover:from-amber-400 hover:via-amber-200 hover:to-yellow-400 focus:outline-none focus:ring-cyan-800 dark:focus:ring-cyan-300 font-medium rounded-3xl text-lg px-5 py-2 text-center me-2 mb-2"
              >
                Continue
              </button>
              <Toaster />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
