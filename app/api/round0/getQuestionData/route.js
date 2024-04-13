import { connectMongoDB } from "@/lib/mongodb";
import { Round0 } from "@/models/round0.model";
import { Event1Test } from "@/models/event1Test.model";
import { getTokenDetails } from "@/utils/authuser.js";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await connectMongoDB();
  try {
    const token = await getToken({ req });
    const auth = token
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization").split(" ")[1];
    let userId = await getTokenDetails(auth);

    const teamData = await Round0.findOne({ teamLeaderId: userId });
    console.log(userId);
    if (!teamData) {
      return NextResponse.json({ message: "team not found" }, { status: 404 });
    }
    // const team = await Event1Test.findById(teamId);
    // if (team.level !== -1) {
    //   return NextResponse.json(
    //     { message: "Round0 is not started" },
    //     { status: 403 }
    //   );
    // } else {

    const questionCatogory = teamData.questionCategory;
    console.log('ggggggggggggggggggg',questionCatogory);
    const pointer = teamData.questionPointer;
    const easyOrder = teamData.easyOrder;
    const mediumOrder = teamData.mediumOrder;
    const hardOrder = teamData.hardOrder;
    console.log('adsfafdsfffffffffffffffff',pointer);
    let questionNumber = 0;
    if (questionCatogory == "waiting") {
      return NextResponse.json({ message: "Round 0 is over",category:"waiting" }, { status: 200 });
    }
    if (questionCatogory === "easy") {
      questionNumber = easyOrder[pointer];
    } else if (questionCatogory === "medium") {
      questionNumber = mediumOrder[pointer];
    } else if (questionCatogory === "hard") {
      questionNumber = hardOrder[pointer];
    } else if (questionCatogory === "instruction") {
      return NextResponse.json(
        {
          category: "instruction",
          questionNumber: -1,
          teamName: teamData.teamName,
        },
        { status: 200 }
      );
    } else if (questionCatogory === "waiting") {
      return NextResponse.json(
        {
          category: "waiting",
          questionNumber: -1,
          teamName: teamData.teamName,
        },
        { status: 200 }
      );
    }
    const response = {
      message: "Successfully got the next question!",
      category: questionCatogory,
      questionNumber: questionNumber,
      chronoNumber: pointer,
      teamName: teamData.teamName,
    };

    console.log('adsfsgdfsagasasdsg',response);

    return NextResponse.json(
      {
        message: "Successfully got the next question!",
        category: questionCatogory,
        questionNumber: questionNumber,
        chronoNumber: pointer,
        teamName: teamData.teamName,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
// }

// question number, category
