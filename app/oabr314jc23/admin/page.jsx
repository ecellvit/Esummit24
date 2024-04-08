"use client";
import { useState, useEffect } from "react";
const Page = () => {
  const [backData, setBackData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch("/api/oabr314jc23/admin/getNumbers")
      .then((res) => res.json())
      .then((data) => {
        setBackData(data.numbers);
        console.log(data.numbers);
        console.log(typeof data.numbers);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);
  return (
    <main className="min-h-screen p-20 bg-[#0E0E0E] text-white">
      {backData ? (
        error ? (
          "Something went wrong."
        ) : (
          <div>
            <ul>
              <li>Total Users = {backData.totalUsers}</li>
              <li>Innoventure Registrations = {backData.innoventure}</li>
              <li>
                Financial literacy workshop ={" "}
                {backData["financial literacy workshop"]}
              </li>
              <li>Achievers Conclave = {backData["achiever's conclave"]}</li>
              <li>E-talk = {backData["e-talk"]}</li>
              <li>ideathon = {backData.ideathon}</li>
            </ul>
          </div>
        )
      ) : (
        "Loading..."
      )}
    </main>
  );
};

export default Page;
