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
    return NextResponse.json(err, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const search = query.get("search") || "";
    const page = query.get("page") || "1";
    const limit = query.get("limit") || "50";

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // total count
    const count = await prisma.medicine.count();

    const data = await prisma.medicine.findMany({
      skip: skip,
      include: { generic: true },
    });

    const res = {
      count,
      data,
    };

    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
