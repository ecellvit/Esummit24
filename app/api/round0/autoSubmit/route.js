import time from "@/constant/round0/time";
import { connectMongoDB } from "@/lib/mongodb";
import { Round0 } from "@/models/round0.model";
import { Event1Test } from "@/models/event1Test.model";
import { getTokenDetails } from "@/utils/authuser.js";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await connectMongoDB();
  console.log('llllllllllllllllllllllllllllllllllll inside autoSubmit');
  try {
    const token = await getToken({ req });
    const auth = token
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization").split(" ")[1];
    let userId = await getTokenDetails(auth);
    const teamData = await Round0.findOne({ teamLeaderId: userId });
    if (!teamData) {
      return NextResponse.json({ message: "Team not found" }, { status: 400 });
    }
    
    await Round0.findOneAndUpdate(
        { teamLeaderId: userId },
        {
          questionCategory: 'waiting'
        }
    )

    return NextResponse.json({message: `Successfully set the category to waiting`},{status:200});
    
  }catch(error){
    return NextResponse.json({message:error},{status:500})
  }
}

