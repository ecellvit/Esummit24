

// to merge 2 1 member into 2 member
import { connectMongoDB } from "@/lib/mongodb";
import { testingEvent2 } from "@/models/testingEvent2.model";
import { testingUsers } from "@/models/testingUsers.model";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongoDB();
        const totalTeams1 = await testingEvent2.find();
        //const testingUsersWithNullTeamId = await testingUsers.find({testingEvent2TeamId:null });

       // const userobj = testingUsersWithNullTeamId.map((user) => user._id);

        let count = 0;
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;

     // to merge two 1 memebr team into 2 member team   

   
    for (const team of totalTeams1) {
      if (team.members.length === 1) {
        const oneMemberTeam1 = totalTeams1.find(
          (t) => t.members.length === 1 && t.teamName != team.teamName
        );
        //const oneMemberTeam2=totalTeams1.find(t=>t.members.length===1)
        if (oneMemberTeam1) {
            await testingUsers.updateMany(
                { Event2TeamId: team._id }, 
                { $set: { Event2TeamId: oneMemberTeam1._id ,Event2TeamRole:1} }, 
                { new: true } 
            );
          const memberToRemove = team.members.pop();

      

            
          console.log(memberToRemove);
          oneMemberTeam1.members.push(memberToRemove.toString());
    
          await team.save();
          await oneMemberTeam1.save();
          await testingEvent2.deleteOne({ _id: team._id });

        } else {
          count1++;
        }
      } else if (team.members.length === 2) {
        count2++;
      } else if (team.members.length === 3) {
        count3++;
      } else if (team.members.length === 4) {
        count4++;
      }
    }

    

    // to merege two 2 member team into 4 memeber tea,
    

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
