import { connectMongoDB } from "@/lib/mongodb";
import { Round0 } from "@/models/round0.model";
import { Users } from "@/models/user.model";
import { Event1Test } from "@/models/event1Test.model";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    await connectMongoDB();





    const totalTeams1=await Event1Test.find().populate({path:'teamLeaderId', model:Users,select:'email,mobno,firstName'})
    console.log(totalTeams1)
    const qualTeams = await Round0.find();
    if (!qualTeams) {
      res.status(400).json({ message: "Team not found" });
      return;
    }

    // console.log("3456765434567898765434567897654345678");
    // console.log("qualTeamsLength=", qualTeams.length);
    let counter = 0;
    const arr = []
    qualTeams.forEach(async (qualTeam) => {
        counter++;
        const test = await Round0.findById(qualTeam._id)
        console.log(test)
        arr.push(test)
     
    });
    console.log("Counter ==== ",counter);
    return res.status(200).json({
      message: "Points updated successfully",
      teams: arr,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
