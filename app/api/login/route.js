import { connectMongoDB } from "@/lib/mongodb";
import { Users } from "@/models/user.js";
import { getTokenDetails } from "@/utils/authuser.js";
import { getToken } from "next-auth/jwt";
import { headers } from 'next/headers';
import { NextResponse } from "next/server";


export async function POST(req){
    try{
        await connectMongoDB();
        const headersList = headers()
    // const authorization = headersList.get('authorization')
        const token = await getToken({req})    
        //console.log('ff', token)
        console.log(token.accessTokenFromBackend);
       // const auth = req.headers.get("authorization").split(' ')[1];
 
        let userId = await getTokenDetails(token.accessTokenFromBackend);
        console.log(userId);
        const user=await Users.findById(userId);
        console.log(user);

        const {regNo,mobno}=await req.json();
        
        await Users.findByIdAndUpdate(userId,{$set:{regNo:regNo,mobno:mobno}})
       // console.log(newUserDetail);
       // const { accessToken, refreshToken } = await generateTokens(newUserDetail);
       // console.log(accessToken);
       // console.log(refreshToken);

        //console.log(accessToken);
     
        return NextResponse.json({ message: "User Details entered ", status: 200 });
        

    }catch(error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Error occurred ", status: 500 });
    }
    
}