import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { spawn } from "child_process";
import path from "path"

export async function GET() {
    console.log("hii");
    
  const data = await new Promise((resolve, reject) => {
    const scriptPath = path.join( process.cwd(), "ml", "analysis.py");
    const python = spawn("python", [scriptPath]); //run python file

    let dataString = "";
    let errorString = "";

    python.stdout.on("data", (chunk) => {
      dataString += chunk.toString();
    });

    python.stderr.on("data", (chunk) => {
      errorString += chunk.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {  // 0 if code run successfully
        reject(new Error(errorString));
        return;
      }

      try {
        resolve(JSON.parse(dataString));
      } catch (err) {
        reject(err);
      }
    });
  });
console.log("Parsed data:", data);
  const client = await clientPromise;
  const db = client.db("crypto");
  const collection = db.collection("coins");
  await collection.deleteMany({});
  await collection.insertMany(data);
  return NextResponse.json(data);
}