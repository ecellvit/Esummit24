import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { TeamModel } from "@/models/TeamDetails";
import { Users } from "@/models/user";
import { middleware } from "../../middleware/route";
import {getTokenDetails} from "../../../../utils/auth"

export async function POST(req){
    try{
        await connectMongoDB();
        const headers = req.headers;
        //console.log(headers.get("authorization"))

      

        const auth = req.headers.get("authorization").split(' ')[1];
        //console.log(auth)
        let userId = await getTokenDetails(auth);
        //console.log(userId)
        const user = await Users.findById({ _id: userId});
        console.log(user);

        const {teamName}=await req.json();
        const team=await TeamModel.findOne({teamName:teamName})
        if(team){
            return NextResponse.json({ message: "Team Already registered ", status: 200 });
        }
        console.log(teamName)
        const newTeam = await new TeamModel({
        teamName:teamName
        
    
    }).save();

    await Users.updateMany(
        { _id: userId },
        { $set: { teamId: newTeam._id } }
    );
 
    return NextResponse.json({ message: "Team Details entered ", status: 200 });




}catch(error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
}
}