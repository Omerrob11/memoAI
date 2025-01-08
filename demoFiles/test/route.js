// src/app/api/test/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Get the data from the request
    const data = await req.json();

    // Send back a simple response
    return NextResponse.json({
      message: "Test API is working!",
      receivedData: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong with test endpoint" },
      { status: 500 }
    );
  }
}
