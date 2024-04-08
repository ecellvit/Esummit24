import { connectMongoDB } from "@/lib/mongodb";
import { Users } from "@/models/user.model";
import { getTokenDetails } from "@/utils/authuser";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectMongoDB();
    const headers = req.headers;
    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1]
    const userId = await getTokenDetails(auth);
    if (!userId) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    let currentEventsArr = new Array();
    if (user.events) {
      currentEventsArr = user.events;
      if (currentEventsArr.includes(1)) {
        return NextResponse.json(
          { message: "User has already registered for the event1." },
          { status: 200 }
        );
      }
    } 
    const modifiedEventsArr = [...currentEventsArr, 1];
    user.events = modifiedEventsArr;
    await user.save();
    return NextResponse.json(
      { message: "User registered for event1 successfully." },
      { status: 200 }
    );
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      { message: `Internal Server Error. ${err.message}` },
      { status: 500 }
    );
  }
}
