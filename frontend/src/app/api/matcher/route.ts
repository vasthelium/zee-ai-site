import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { job_description } = await req.json();

    const response = await fetch("https://api.syedzameer.io/match", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_description }),
    });

    const data = await response.json();

    return NextResponse.json(data);
}