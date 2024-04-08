import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Users } from "@/models/user.model";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/authuser";

export async function POST(req) {
  try {
    await connectMongoDB();

    const token = await getToken({ req });
    const auth = token
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization").split(" ")[1];
    let userId = await getTokenDetails(auth);
    const { consent } = await req.json();
    await Users.findByIdAndUpdate({ _id: userId }, { event2Consent: consent });
    return NextResponse.json(
      { message: "User has event1 consent" },
      { status: 200 }
    );
  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
