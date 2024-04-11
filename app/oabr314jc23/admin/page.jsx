"use client";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
const Page = () => {
  const [backData, setBackData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch("https://members-esummit.onrender.com/getnumbers")
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
          <section className="text-center">
            <div>
              <h1 className="text-4xl font-bold my-2">Users</h1>
              <p>Total number of signIns = {backData.signedIn}</p>
              <p>Number of users who filled details = {backData.totalUsers}</p>
              <p>
                Number of users who registered for atleast one event ={" "}
                {backData.atLeastOneEvent}
              </p>
            </div>
            <div>
              <h1 className="text-4xl font-bold my-2">Innoventure</h1>
              <p>Total participants = {backData.innoventure?.totalParticipants}</p>
              <p>Total teams = {backData.innoventure?.total}</p>
              <p>Teams with one member = {backData.innoventure?.one}</p>
              <p>Teams with two members = {backData.innoventure?.two}</p>
              <p>Teams with three members = {backData.innoventure?.three}</p>
              <p>Teams with four members = {backData.innoventure?.four}</p>
            </div>
            <div>
              <h1 className="text-4xl font-bold my-2">Ideathon</h1>
              <p>Total participants = {backData.ideathon?.totalParticipants}</p>
              <p>Total teams = {backData.ideathon?.total}</p>
              <p>Teams with one member = {backData.ideathon?.one}</p>
              <p>Teams with two members = {backData.ideathon?.two}</p>
              <p>Teams with three members = {backData.ideathon?.three}</p>
              <p>Teams with four members = {backData.ideathon?.four}</p>
            </div>
            <div>
              <h1 className="text-4xl font-bold my-2">Other Events</h1>
              <p>Financial Literacy Workshop = {backData.financial}</p>
              <p>Achievers&apos; Conclave = {backData.achiever}</p>
              <p>E-Talk = {backData.etalk}</p>
            </div>
          </section>
        )
      ) : (
        "Loading..."
      )}
    </main>
  );
};

export default Page;
