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

// src/services/testApi/index.js
export async function testApiConnection() {
  try {
    // Log that we're starting the test
    console.log("Testing API connection...");

    const response = await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: "Hello API!",
      }),
    });

    // Log the response status
    console.log("Response status:", response.status);

    // If we get a non-JSON response, let's see what we got
    const contentType = response.headers.get("content-type");
    console.log("Content type:", contentType);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Test API Error:", error);
    throw error;
  }
}

export const testEnd = async (documentPath) => {
  // if (!documentPath) {
  //   throw new Error("Document path is required");
  // }
  try {
    const response = await fetch("/api/extract-document-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sendindProperty: "sending value",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // console.log(response);
    // console.log("before await respose.json(data)");

    // const data = await response.json();
    // console.log("after wait respone.json(data)");
    // console.log(data);
    return data;
  } catch (error) {
    // console.error("Test API Error:", error);
    // throw error;
  }
};
