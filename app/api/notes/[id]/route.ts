import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deleteNotes = await db.notes.delete({
    where: {
      id: String(id),
    },
  });

  return NextResponse.json(deleteNotes);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { ncategory, ntitle, ndescription } = await req.json();

    if (!id) return new NextResponse("Id is required", { status: 400 });

    if (!ncategory)
      return new NextResponse("Category is required", { status: 400 });

    if (!ntitle) return new NextResponse("Title is required", { status: 400 });

    if (!ndescription)
      return new NextResponse("Description is required", { status: 400 });

    const updateNotes = await db.notes.update({
      where: {
        id: String(id),
      },
      data: {
        ncategory,
        ntitle,
        ndescription,
      },
    });

    return NextResponse.json(updateNotes);
  } catch (error) {
    console.log("[NOTES_PATCH]", error);
    return new NextResponse("Failed to update notes", { status: 500 });
  }
}
