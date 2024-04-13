import time from "@/constant/round0/time";
import { connectMongoDB } from "@/lib/mongodb";
import { Round0 } from "@/models/round0.model";
import { Event1Test } from "@/models/event1Test.model";
import { getTokenDetails } from "@/utils/authuser.js";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongoDB();
  const token = await getToken({ req });
  const auth = token
    ? token.accessTokenFromBackend
    : req.headers.get("Authorization").split(" ")[1];
  let userId = await getTokenDetails(auth);

  try {
    const startTime = new Date().getTime();
    const endTime = startTime + 1000 * 60 * time.round0; //mins
    console.log(userId);
    console.log(typeof userId);
    // userId = userId.toString();
    // console.log(typeof userId);
    const teams = await Event1Test.find();
    let team;
    teams.forEach(t=>{
      if(t.teamLeaderId == userId) {
        console.log(" team")
        team = t;
        return
      }
    })
    const teamId = team._id;
    const teamData = await Round0.findOne({ teamId: teamId });
    if (teamData.startTime === undefined || teamData.startTime === null) {
      await Round0.findOneAndUpdate(
        { teamId: teamId },
        { startTime: startTime, endTime: endTime }
      );
      return NextResponse.json(
        {
          message: "Time set successfully",
          startTime: startTime,
          endTime: endTime,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Time already set", startTime: teamData.startTime, endTime: teamData.endTime },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
