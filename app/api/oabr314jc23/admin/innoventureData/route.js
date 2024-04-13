// import { connectMongoDB } from "@/lib/mongodb";
// import { Event1 } from "@/models/event1.model";
// import { Event2 } from "@/models/event2.model";
// import { Users } from "@/models/user.model";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     await connectMongoDB();
//     const teams = await Event1.find();
//     const signedInUsers = await Users.find();
//     const teamsWith1pr2 = teams.filter(
//       (team) => team.members.length === 3 || team.members.length === 4
//     );
//     // const users = []
//     // teamsWith1pr2.map((team) => {
//     //   let userData = {};
//     //   team.members.forEach(async (member) => {
//     //     const user = await Users.findOne({ _id: member });
//     //     userData = {
//     //       id: user._id,
//     //       name: user.name,
//     //       contact: user.mobNo,
//     //     };
//     //     users.push(userData);
//     //   });
//     //   data.push(users);
//     // });

//     const users = []
//     for(let team = 0; team < teamsWith1pr2.length; team++){
//         let userData = {};
//         for (let mem = 0 ; mem < teamsWith1pr2[team].members.length; mem++){
//             const user = await Users.findOne({ _id: teamsWith1pr2[team].members[mem] });
//             if (user.event1TeamRole !== 0) continue 
//             userData = {
//                 id: user._id,
//                 name: user.name,
//                 contact: user.mobNo,
//                 teamName: teamsWith1pr2[team].teamName
//             };
//             users.push(userData);
//         }

//     }
//     console.log(users)
    
    
//     return NextResponse.json({ message: "Success", data:users }, { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       { message: `Internal Server Error. ${err.message}` },
//       { status: 500 }
//     );
//   }
// }
