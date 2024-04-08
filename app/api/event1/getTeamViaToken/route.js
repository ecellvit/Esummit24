import { connectMongoDB } from "@/lib/mongodb";
import { Event1 } from "@/models/event1.model";
import { event1TeamToken } from "@/models/event1TeamToken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { teamCode } = await req.json();
    const team = await event1TeamToken.findOne({ token: teamCode });

    if (!team) {
      return NextResponse.json({ error: "Token not found" });
    }
    const teamDetails = await Event1.findById(team.teamId);

    return NextResponse.json({
      message: "Team Details sent. ",
      status: 200,
      teamDetails: teamDetails,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error occurred ",}, {status: 500 });
  }
}
