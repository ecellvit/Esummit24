import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.model';
import { jwtVerify } from 'jose';

export  async function getTokenDetails(token) {
  try {
    connectMongoDB();
    console.log("fsdaghjgdshbfzhjdbvsjhbdfhjcbghjgfd")
    const tokenDetails = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );


    const userId = tokenDetails.payload._id;
   // console.log(userId)

    const user = await Users.findById(userId);

   
    return userId;

  } catch (err) {
    console.log('Kuch Error hogya bro', err);
  }
}
