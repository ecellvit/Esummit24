import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.model';
import { NextResponse } from 'next/server';

import { Event1 } from '@/models/event1.model';
import { getToken } from 'next-auth/jwt';
import { getTokenDetails } from '../../../../utils/authuser';

export async function POST(req) {
  try {
    await connectMongoDB();

    const token = await getToken({ req });
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1];
    let userId = await getTokenDetails(auth);

    const user = await Users.findById({ _id: userId });

    const { teamName } = await req.json();
    const team = await Event1.findOne({ teamName: teamName });
    if (team) {
      return NextResponse.json({
        message: 'Team Already registered',
        status: 405,
      });
    }

    const newTeam = await new Event1({
      teamName: teamName,
      teamLeaderId: userId,
      members: [userId],
    }).save();

    await Users.findByIdAndUpdate(
      { _id: userId },
      { $set: { event1TeamId: newTeam._id, event1TeamRole: 0 } }
    );

    return NextResponse.json({
      message: 'Team Details entered ',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Error occurred '}, {status:500});
  }
}
