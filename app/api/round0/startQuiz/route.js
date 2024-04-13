import time from '@/constant/round0/time';
import { connectMongoDB } from "@/lib/mongodb";
import { Round0 } from "@/models/round0.model";
import { Event1Test } from "@/models/event1Test.model";
import { getTokenDetails } from "@/utils/authuser.js";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, res) {

  await connectMongoDB();
  console.log('inside route')
  const token = await getToken({ req });
  const auth = token
    ? token.accessTokenFromBackend
    : req.headers.get("Authorization").split(" ")[1];
  let userId = await getTokenDetails(auth);

  try{
  
    // const teamId = Event1Test.findOneById({ _id: userId });
  
    const qualTeam = await Round0.find({ teamLeaderId: userId });
    console.log('adsffffffdffffffffffffff',qualTeam);
    if (!qualTeam) {
      return NextResponse.json({ message: "team not found" }, { status: 404 });
    }
    console.log('hhhhhhhhhhhhhhhhh',qualTeam);
    await Round0.findOneAndUpdate(
      { teamLeaderId: userId },
      {
        $set: {
          questionCategory: 'easy',
          questionPointer: 0,
        },
      }
    );
    return NextResponse.json({message:'Round0 started'},{status:200});
  }catch(error){
    return NextResponse.json({message:error},{status:500});
  }

  // try {

  //   let startTime = new Date(`January ${time.quizStartTime.day}, 2024 ${time.quizStartTime.hour}:${time.quizStartTime.minute}:${time.quizStartTime.second}`);
  //   startTime.toTimeString();
  //   startTime = startTime - 4;
  //   console.log(startTime);
    
  //   // const currentTime = new Date();
  //   const currentTime = startTime;

  //   console.log('curentTime', currentTime, 'startTime', startTime);
  //   console.log('asdf', Math.abs(currentTime - startTime))

  //   if (Math.abs(currentTime - startTime) <= 20 * 60 * 1000) {
  //     console.log('correct')
      // await Round0.findOneAndUpdate(
      //   { teamId: teamId },
      //   {
      //     $set: {
      //       questionCategory: 'easy',
      //       questionPointer: 0,
      //     },
      //   }
      // );
      // return NextResponse.json({message:'Round0 started'},{status:200});
      
  //   } else if (currentTime < startTime) {
  //     return NextResponse.json({
  //       time: currentTime,
  //       message: 'Quiz has not started yet',
  //     },
  //   {status:403});
  //   } else {
  //     return NextResponse.json({
  //       time: currentTime,
  //       message: 'Too late',
  //     },{status:404});
  //   }
  // } catch (error) {
  //   return NextResponse.json({message:error.toString()},{status:500})
  // }
}
