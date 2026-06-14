import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    const client=await clientPromise
    const db=client.db("crypto")
    const collection = db.collection("Alerts");
    
}