import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { job_description } = await req.json();

    const response = await fetch("http://127.0.0.1:8000/match", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_description }),
    });

    const data = await response.json();

    return NextResponse.json(data);
}