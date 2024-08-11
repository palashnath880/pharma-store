import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { genericId: string } }
) {
  try {
    const genericId = context.params.genericId;

    const result = await prisma.generic.delete({ where: { id: genericId } });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
