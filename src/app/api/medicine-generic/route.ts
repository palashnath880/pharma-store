import prisma from "@/lib/prisma";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const newGeneric = await req.json();

    // get by name
    const getGeneric = await prisma.generic.findUnique({
      where: { name: newGeneric?.name || "" },
    });
    if (getGeneric) {
      return NextResponse.json(
        { message: `${getGeneric?.name} already exists` },
        { status: 409 }
      );
    }

    // create
    const result = await prisma.generic.create({
      data: { ...newGeneric, createdAt: moment.utc().toString() },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const page = query.get("page") || "1";
    const limit = query.get("limit") || "50";
    const search = query.get("search") || "";

    // count all generics
    const count = await prisma.generic.count({
      where: search ? { name: { contains: search } } : {},
    });

    // get all generics
    const generics = await prisma.generic.findMany({
      where: search ? { name: { contains: search } } : {},
      skip: (parseInt(page) - 1) * parseInt(limit),
    });

    return NextResponse.json({
      count,
      data: generics,
    });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
