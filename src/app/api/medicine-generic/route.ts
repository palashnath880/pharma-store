import prisma from "@/lib/prisma";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const generic = await req.json();

    // get generic
    const getGeneric = await prisma.generic.findUnique({
      where: { name: generic?.name },
    });

    if (getGeneric) {
      return NextResponse.json(
        { message: `${generic?.name} already exists` },
        { status: 409 }
      );
    }

    // insert generic
    const result = await prisma.generic.create({
      data: {
        name: generic?.name,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
