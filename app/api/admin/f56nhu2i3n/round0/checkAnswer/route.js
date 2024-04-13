// import answers from "@/constant/round0/answers.json";
// import gamePoints from "@/constant/round0/points.json";
// import { connectMongoDB } from "@/lib/mongodb";
// import { Round0 } from "@/models/round0.model";
// import { getTokenDetails } from "@/utils/authuser.js";
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function GET(req, res) {
//   try {
//     await connectMongoDB();

//     const qualTeams = await Round0.find();
//     if (!qualTeams) {
//       return NextResponse.json({ message: "Team not found" },{status:400});
//     }

//     console.log("3456765434567898765434567897654345678");
//     console.log("qualTeamsLength=", qualTeams.length);
//     let counter = 0;
//     qualTeams.forEach(async (qualTeam) => {
//      counter++;

//       let points = 0;
//       const qualifierData = await Round0.findOne({
//         teamName: qualTeam.teamName,
//       });
//       const easyAnswers = qualifierData.easyAnswers;
//       const mediumAnswers = qualifierData.mediumAnswers;
//       const hardAnswers = qualifierData.hardAnswers;
//       // const caseStudyAnswers = qualifierData.caseStudyAnswers;
//       // console.log("fasgfasgasg");
//       // console.log(qualifierData);
//       // console.log(qualifierData.easyAnswers[1]);

//       // console.log(qualifierData.easyAnswers.length);
//       // console.log( answers.easyAnswers.length);
//       // console.log("12345678")
//       // console.log(qualifierData.easyAnswers[1]);

//       // for comparing easy answers
//       // for (let pointer = 0; pointer < answers.easyAnswers.length; pointer++) {
//       //   if (typeof answers.easyAnswers[pointer] === "number") {
//       //     if (easyAnswers[pointer] === answers.easyAnswers[pointer]) {
//       //       points += gamePoints.easyPoints;
//       //     }
//       //   } else if (typeof answers.easyAnswers[pointer] === "object") {
//       //     if (compareArrays(qualifierData.easyAnswers[pointer], answers.easyAnswers[pointer])) {
//       //       points += gamePoints.easyPoints;
//       //     }
//       //   }
//       // }
//       for (
//         let pointer = 0;
//         pointer < qualifierData.easyAnswers.length;
//         pointer++
//       ) {
//         if (typeof answers.easyAnswers[pointer] === "object") {
//           if (
//             compareArrays(
//               qualifierData.easyAnswers[pointer],
//               answers.easyAnswers[pointer]
//             )
//           ) {
//             points += gamePoints.easyPoints;
//           }
//         }
//       }
//       // for comparing medium answers
//       for (
//         let pointer = 0;
//         pointer < qualifierData.mediumAnswers.length;
//         pointer++
//       ) {
//         if (typeof answers.mediumAnswers[pointer] === "object") {
//           if (
//             compareArrays(
//               qualifierData.mediumAnswers[pointer],
//               answers.mediumAnswers[pointer]
//             )
//           ) {
//             points += gamePoints.mediumPoints;
//           }
//         }
//       }
//       // for comparing hard answers
//       for (
//         let pointer = 0;
//         pointer < qualifierData.hardAnswers.length;
//         pointer++
//       ) {
//         if (typeof answers.hardAnswers[pointer] === "object") {
//           if (
//             compareArrays(
//               qualifierData.hardAnswers[pointer],
//               answers.hardAnswers[pointer]
//             )
//           ) {
//             points += gamePoints.hardPoints;
//           }
//         }
//       }
//       // for comparing caseStudy answers
      

//       await Round0.findOneAndUpdate(
//         { teamName: qualTeam.teamName },
//         { points: points }
//       );
//     });
//     console.log("Counter ==== ",counter);
//     return NextResponse.json({
//       message: "Points updated successfully",
//     },{status:200});
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ error: "Internal server error" },{status:500});
//   }
// }

// function compareArrays(arr1, arr2) {
//   if (arr1 === null) {
//     return false;
//   }
//   if (arr1.length !== arr2.length) {
//     return false;
//   }

//   // Convert arrays to sets
//   const set1 = new Set(arr1);
//   const set2 = new Set(arr2);

//   // Check if sets are equal
//   return arraysAreEqual(Array.from(set1), Array.from(set2));
// }
// function arraysAreEqual(array1, array2) {
//   return array1.every((element) => array2.includes(parseInt(element)));
// }
