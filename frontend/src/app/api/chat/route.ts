import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Backend error:", text);
    return NextResponse.json({ error: text }, { status: 500 });
  }

  const data = await response.json();

  return NextResponse.json({
    reply: data,
  });
}