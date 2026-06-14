import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();
 console.log(token);
 
  // save token in mongodb
  return NextResponse.json({
    success: true,
  });
}