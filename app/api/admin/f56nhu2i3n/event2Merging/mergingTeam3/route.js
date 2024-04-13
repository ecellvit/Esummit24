// to take 2 member from teamId==null and consent=true and merge with 2 member team

//only hit when you have any two member team left, don't hit it when you have not two member  team.

import { connectMongoDB } from "@/lib/mongodb";
import { testingEvent2 } from "@/models/testingEvent2.model";
import { testingUsers } from "@/models/testingUsers.model";
import { NextResponse } from "next/server";

export async function GET(req)  {
    try{
        await connectMongoDB();
        const totalTeams1 = await testingEvent2.find();
        const usersWithNullTeamId = await testingUsers.find({ 
            event2TeamId: null,
            event2Consent:true,
            events: { $elemMatch: { $eq: 2 } } });

        const userobj = usersWithNullTeamId.map((user) => user._id.toString());
        let a=0;
        let count = 0;
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        for (const team of totalTeams1) {
            if (team.members.length === 2) {
              team.members.push(userobj[a],userobj[a+1]);
              await team.save();
              await testingUsers.findByIdAndUpdate(userobj[a],{$set:{
                event2TeamId: team._id, 
                event2TeamRole:1
              }});
              await testingUsers.findByIdAndUpdate(userobj[a+1], {
                event2TeamId: team._id, 
                event2TeamRole:1
              });
              
      
              
              count4++;
            } else if (team.members.length === 1) {
              count1++;
            } else if (team.members.length === 3) {
              count3++;
            } else if (team.members.length === 2) {
              count2++;
            }

            a=a+2;
          }

        const totalTeams = await testingEvent2.countDocuments();
        return NextResponse.json({
          'Total no of teams': totalTeams,
          
        });
      } catch (error) {
        console.error(error);
        return NextResponse.json({
          message: 'Something went wrong',
        });
      }
    }
    