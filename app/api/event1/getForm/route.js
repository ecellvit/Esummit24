import { connectMongoDB } from "@/lib/mongodb";
import { getTokenDetails } from "@/utils/authuser";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Event1 } from "@/models/event1.model";

export async function GET(req, res) {
  await connectMongoDB();
  try {
    const token = await getToken({ req });
    const auth = token
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization").split(" ")[1];
    let userId = await getTokenDetails(auth);
    if (!userId) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const userArray = await Event1.find();
    let user;
    userArray.forEach((team) => {
      if (team.teamLeaderId == userId) {
        user = team;
      }
    });
    console.log("\n\n\n\n\n");
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success", user: user },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
