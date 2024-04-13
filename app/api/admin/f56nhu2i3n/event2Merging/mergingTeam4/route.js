// to do:check uske events ke array me 1 hai ya nhi. agr nhi h, toh koi mtlb nhi h usse event1 ke liye merge karne ka
//done.

import { connectMongoDB } from "@/lib/mongodb";
import { testingEvent2 } from "@/models/testingEvent2.model";
import { testingUsers } from "@/models/testingUsers.model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req)  {
  try {
    console.log('\n\n\n-------------------------------------------------------\n\n\n');
    await connectMongoDB();
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;

    const totalTeams1 = await testingEvent2.find();

    const totalUsers = await testingUsers.countDocuments();
    //console.log(totalUsers);
    const usersWithNullTeamId = await testingUsers.find({ 
        event2TeamId: null,
        event2Consent: true,
        events: { $elemMatch: { $eq: 2 } }
    });
    
   console.log('hhhhhhhhhhhhhhhhhh',usersWithNullTeamId);
    const userobj = usersWithNullTeamId.map((user) => user._id);
    console.log(userobj);
    console.log(usersWithNullTeamId.length);


    function generateRandomString(length) {
        const charset =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(
            Math.random() * charset.length
          );
          result += charset.charAt(randomIndex);
        }
        return result;
      }

      for (let i = 0; i < userobj.length; i += 4) {
        const remainingUsers = userobj.length - i;
  
        if (remainingUsers >= 4) {
          const arr = [userobj[i], userobj[i + 1], userobj[i + 2],userobj[i+3]];
          console.log('arrayyyyyyyy',arr);
  
          // Your existing code to create and save the team
          const newTeam = new testingEvent2({
            teamName: generateRandomString(8),
            members: arr,
            teamCode:generateRandomString(10),
            teamLeaderId:userobj[i]


          });
  
          await newTeam.save();
  
          for (const user of arr) {
            console.log('\n/////////////////////\n',user._id);
            // const userId = ObjectId.isValid(user._id) ? ObjectId(user._id) : user._id;
            // console.log('\n/////////////////////\n',userId);
            const new1=await testingEvent2.findOne({teamLeaderId:user._id});
            console.log('nnnnnnnnnnnnnnnnnnnnnnn',new1);
            if(new1){
              // console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',user._id)
              await testingUsers.findByIdAndUpdate(user._id, {
                $set: {
                    event2TeamId: newTeam._id,
                    event2TeamRole:0
                    
                }
            });
            }else{
              await testingUsers.findByIdAndUpdate(user._id, {
                $set: {
                    event2TeamId: newTeam._id,
                    event2TeamRole:1
                    
                }
            })
            }
           
        }
        
  
          count4++;
        }
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
