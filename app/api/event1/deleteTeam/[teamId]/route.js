import { connectMongoDB } from "@/lib/mongodb";
import { Event1 } from "@/models/event1.model";

import { event1TeamToken } from "@/models/event1TeamToken";
import { Users } from "@/models/user.model";
import { getTokenDetails } from "@/utils/authuser";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req,{params}){

    try{
        
        await connectMongoDB();
        
        const token = await getToken({req})
        const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1]
        let userId = await getTokenDetails(auth);      


        const teamId=params.teamId;
        const team = await Event1.findById({ _id: teamId });
        
        if (!team) {
        return res.status(401).json({
            message: "Invalid TeamId"
        })}

        if (team.teamLeaderId.toString() !== userId) {
            return NextResponse.json({ message: "User do not belong to the team or the user is not a leader", status: 200 });
        }

        if (team.members.length !== 1) {
            return NextResponse.json({ message: "Team Size more than 1", status: 200 });
        }

        await Event1.findOneAndDelete({
            _id: teamId,
        });
    
        await event1TeamToken.findOneAndDelete({
            teamId: teamId,
        });
    
        await Users.findByIdAndUpdate(
            { _id: userId },
            { event1TeamId: null, event1TeamRole: null }
        );
    
        /*
        const deletedTeam = await TeamModel.deleteOne({teamName:teamName});
        console.log(deletedTeam)
        */
 
    return NextResponse.json({ message: "Team deleted", status: 200 });

}catch(error) {
    return NextResponse.json({ message: "Error occurred ",}, {status: 500 });
}}