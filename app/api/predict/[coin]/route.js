
import { spawn } from "child_process";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    const p=await params
    const coin = p.coin;
    console.log("coin:", coin);

    await new Promise((resolve, reject) => {
      const python = spawn("python", [
        "ml/coin_his.py",
        coin,
      ]);

      python.stdout.on("data", (data) => {
        console.log("stdout:", data.toString());
      });

      python.stderr.on("data", (data) => {
        console.log("stderr:", data.toString());
      });

      python.on("close", (code) => {
        console.log("python exit code:", code);

        if (code !== 0) {
          reject(new Error(`Python exited with ${code}`));
        } else {
          resolve();
        }
      });
    });

    console.log("python finished");

    const client = await clientPromise;
    const db = client.db("crypto");

    const prediction = await db
      .collection("predictions")
      .findOne({ coin });

    console.log("prediction:", prediction);

    return NextResponse.json({ prediction });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}