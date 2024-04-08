import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.model';
import { NextResponse } from 'next/server';

import { Event1 } from '@/models/event1.model';
import { getToken } from 'next-auth/jwt';
import { getTokenDetails } from '../../../../utils/authuser';

export async function GET(req) {
    try {
        await connectMongoDB();

        const token = await getToken({ req });
        const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1];
        let userId = await getTokenDetails(auth);

        const user = await Users.findById({ _id: userId });

        if (!user) {
            return NextResponse.json({ message: 'User Not found' });
        }

        const teamId = user.event1TeamId;
        const team = await Event1.findById(teamId).populate('members');
        if (!team) {
            return NextResponse.json({ message: 'Team is not there' }, {status:201});
        }
    
        return NextResponse.json({
            message: 'Team Details sent. ',
            status: 200,
            teamDetails: team,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error occurred ',
        }, {status: 500});
    }
}
