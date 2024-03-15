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
    console.log("yha aa rha h")


    const userId = tokenDetails.payload._id;

    const user = await Users.findById(userId);
    console.log("\\\\",user);
   
    return userId;

  } catch (err) {
    console.log('Kuch Error hogya bro', err);
  }
}
