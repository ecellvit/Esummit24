import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.js';
import { getTokenDetails } from '@/utils/authuser.js';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectMongoDB();

    // this is how you get the token from the request. DONT TOUCH!
    const token = await getToken({req});
    const auth = token ? token.accessTokenFromBackend : null;
    let userId = await getTokenDetails(auth);

    const { regNo, mobNo } = await req.json();
    console.log('regNo', regNo, mobNo);

    await Users.findByIdAndUpdate(userId, {
      $set: { regNo: regNo, mobNo: Number(mobNo) },
    });

    return NextResponse.json({
      message: 'User Details entered ',
      status: 200,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({
      message: 'Error occurred ',
      status: 500,
    });
  }
}
