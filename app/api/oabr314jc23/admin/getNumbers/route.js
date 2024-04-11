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
    const signedInUsers = await Users.find();
    let totalUsers = 0;
    signedInUsers.forEach((user) => {
      if (user.hasFilledDetails) totalUsers++;
    });
    let atleastOneEvent = 0;
    signedInUsers.forEach((user) => {
      if (user.events.length > 0) {
        atleastOneEvent++;
      }
    });
    const event1Count = await Event1.find();
    const event2Count = await Event2.find();
    const users = await Users.find();
    users.forEach((user) => {
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
      signedIn: signedInUsers.length,
      totalUsers: totalUsers,
      atLeastOneEvent: atleastOneEvent,
      innoventure: {
        total: event1Count.length,
        one: nMembersTeam(event1Count, 1),
        two: nMembersTeam(event1Count, 2),
        three: nMembersTeam(event1Count, 3),
        four: nMembersTeam(event1Count, 4),
      },
      ideathon: {
        total: event2Count.length,
        one: nMembersTeam(event2Count, 1),
        two: nMembersTeam(event2Count, 2),
        three: nMembersTeam(event2Count, 3),
        four: nMembersTeam(event2Count, 4),
      },
      financial: event3,
      achiever: event4,
      etalk: event5,
    };
    return NextResponse.json(
      { message: "Succes", numbers: data },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: `Internal Server Error. ${err.message}` },
      { status: 500 }
    );
  }
}

function nMembersTeam(event, n) {
  let count = 0;
  event.forEach((team) => {
    if (team.members.length === n) count++;
  });
  return count;
}
