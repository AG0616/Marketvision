import admin from "@/lib/firebaseAdmin";

export async function POST(req) {
  try{
  const { token } = await req.json();

  const response=await admin.messaging().send({
    token,
    notification: {
      title: "MarketVision",
      body: "Bitcoin crossed target price",
    },
  });
 console.log("SUCCESS:", response);
  return Response.json({
    success: true,
  });
}catch (err) {
  console.error("ERROR:", err);
}
}