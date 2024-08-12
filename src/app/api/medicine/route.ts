import prisma from "@/lib/prisma";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const medicine = await req.json();

    // get medicine
    const getMedicine = await prisma.medicine.findUnique({
      where: { name: medicine?.name },
    });

    if (getMedicine) {
      return NextResponse.json(
        { message: `${medicine?.name} already exists` },
        { status: 409 }
      );
    }

    // insert
    const result = await prisma.medicine.create({
      data: {
        name: medicine?.name,
        genericId: medicine?.genericId,
        createdAt: moment.utc().toDate(),
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
