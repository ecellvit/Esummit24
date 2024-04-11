import { connectMongoDB } from "@/lib/mongodb";
import { Capacity } from "@/models/capacity.model";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const cap = await Capacity.find();
    const capObj = cap[0];
    await capObj.save();
    return NextResponse.json(
      {
        message: "Capacity fetched successfully.",
        caps: capObj,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: `Internal Server Error. ${err.message}` },
      { status: 500 }
    );
  }
}
