import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { groupId: string } }
) {
  try {
    const groupId = context.params.groupId;

    const result = await prisma.group.delete({ where: { id: groupId } });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
