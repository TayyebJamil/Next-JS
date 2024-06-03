
import { headers } from "next/headers";
import { comments } from "./data";

export async function GET() {
    return Response.json(comments);
}

export async function POST(request: Request) {
    const comment = await request.json();
    const newcommnet = {
        id: comments.length + 1,
        text: comment.text
    }
    comments.push(newcommnet)
    return new Response(JSON.stringify(newcommnet), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201,
    });
}