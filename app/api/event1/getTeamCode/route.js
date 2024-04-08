import { connectMongoDB } from "@/lib/mongodb";
import { Event1 } from "@/models/event1.model";
import { event1TeamToken } from "@/models/event1TeamToken";
import { getTokenDetails } from "@/utils/authuser";
import { customAlphabet } from "nanoid";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();

    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1]
    let userId = await getTokenDetails(auth);
    const team = await Event1.findOne({ teamLeaderId: userId });
    if (!team) {
      return NextResponse.json({ message: "Team Not found" });
    }

    if (!team.teamCode) {
      const teamCode = customAlphabet(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        10
      )();
      // const teamCode = nanoid(10)
      const newToken = await new event1TeamToken({
        teamId: team._id,
        token: teamCode,
        createdAt: new Date(),
      }).save();

      await Event1.findOneAndUpdate(
        { _id: team._id },
        { $set: { teamCode: teamCode } }
      );

      return NextResponse.json({ teamCode: teamCode, teamName: team.teamName });
    } else {
      const token = await event1TeamToken.findOne({ teamId: team._id });

      if (!token) {
        return NextResponse.json({ message: "Token not found" });
      }
      const currentTime = new Date();
      const tokenCreationTime = token.createdAt;
      const timeDifference = (currentTime - tokenCreationTime) / (1000 * 60);
      if (timeDifference > 10) {
        const newTeamCode = customAlphabet(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          10
        )();
        await event1TeamToken.findOneAndUpdate(
          { teamId: team._id },
          { $set: { token: newTeamCode, createdAt: currentTime } }
        );
        await Event1.findOneAndUpdate(
          { _id: team._id },
          { $set: { teamCode: newTeamCode } }
        );

        return NextResponse.json({
          teamCode: newTeamCode,
          teamName: team.teamName,
        });
      } else {
        return NextResponse.json({
          teamCode: token.token,
          teamName: team.teamName,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error,}, {status: 500 });
  }
}
