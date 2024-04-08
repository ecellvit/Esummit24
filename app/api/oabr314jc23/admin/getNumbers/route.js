import { connectMongoDB } from "@/lib/mongodb";
import { Event1 } from "@/models/event1.model";
import { Event2 } from "@/models/event2.model";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    let event3 = 0;
    let event4 = 0;
    let event5 = 0;
    const usersCount = await Users.countDocuments();
    const event1Count = await Event1.countDocuments();
    const event2Count = await Event2.countDocuments();
    const users = await Users.find();
    users.map((user) => {
      if (user.events.includes(3)) {
        event3++;
      }
      if (user.events.includes(4)) {
        event4++;
      }
      if (user.events.includes(5)) {
        event5++;
      }
    });

    const data = {
        "totalUsers" :usersCount,
        "innoventure" : event1Count,
        "financial literacy workshop" : event3,
        "achiever's conclave": event4,
        "e-talk" : event5,
        "ideathon": event2Count
    };
    return NextResponse.json(
      { message: "Succes", numbers: data },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Internal Server Error. ${err.message}` },
      { status: 500 }
    );
  }
}
