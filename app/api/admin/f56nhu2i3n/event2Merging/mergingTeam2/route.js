// two 2 member team into 4 member team
//Doubt- there are some people whose event1 consent is false, but they have their event1 teamId.........inka kya h??
// prioirties, first we go for teamid and then consent wala thing

import { connectMongoDB } from "@/lib/mongodb";
import { testingEvent2 } from "@/models/testingEvent2.model";
import { testingUsers } from "@/models/testingUsers.model";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectMongoDB();
        const totalTeams1 = await testingEvent2.find();
        //const usersWithNullTeamId = await Users.find({ teamId: null });

      //  const userobj = usersWithNullTeamId.map((user) => user._id);

        let count = 0;
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        
        for (const team of totalTeams1) {
            if (team.members.length === 2) {
              const twoMemberTeam1 = totalTeams1.find(
                (t) => t.members.length === 2 && t.teamName != team.teamName
              );
              //const oneMemberTeam2=totalTeams1.find(t=>t.members.length===1)
              if (twoMemberTeam1) {
                await testingUsers.updateMany(
                    { event2TeamId: team._id }, 
                    { $set: { event2TeamId: twoMemberTeam1._id.toString() ,event2TeamRole:1} }, 
                    { new: true } 
                );
                const memberToRemove1 = team.members.pop();
                const memberToRemove2 = team.members.pop();
                console.log(memberToRemove1);
                console.log(memberToRemove2);
                twoMemberTeam1.members.push(memberToRemove1.toString(),memberToRemove2.toString());
                await team.save();
                await twoMemberTeam1.save();
                await testingEvent2.deleteOne({ _id: team._id });
              } else {
                count2++;
              }
            } else if (team.members.length === 1) {
              count1++;
            } else if (team.members.length === 3) {
              count3++;
            } else if (team.members.length === 4) {
              count4++;
            }
          }
      
        const totalTeams = await testingEvent2.countDocuments();
        return NextResponse.json({
          'Total no of teams': totalTeams,
          'No of 4- member teams': count4,
          'No of 3- member teams': count3,
          'No of 2- member teams': count2,
          'No of 1- member teams': count1,
        });
      } catch (error) {
        console.error(error);
        return NextResponse.json({
          message: 'Something went wrong',
        });
      }
    }
    