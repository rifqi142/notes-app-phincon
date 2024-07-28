import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ncategory, ntitle, ndescription } = await req.json();

    if (!ncategory)
      return new NextResponse("n category is required", { status: 400 });

    if (!ntitle)
      return new NextResponse("n title is required", { status: 400 });

    if (!ndescription)
      return new NextResponse("n description is required", { status: 400 });

    const createNotes = await db.notes.create({
      data: {
        ncategory,
        ntitle,
        ndescription,
      },
    });

    return NextResponse.json(createNotes);
  } catch (error) {
    console.log("[NOTES_POST]", error);
    return new NextResponse("Failed to create notes", { status: 500 });
  }
}

export async function GET() {
  const listNotes = await db.notes.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(listNotes);
}


