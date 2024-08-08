import prisma from "@/lib/prisma";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const newGroup = await req.json();

    // get by name
    const getGroup = await prisma.group.findUnique({
      where: { name: newGroup?.name || "" },
    });
    if (getGroup) {
      return NextResponse.json(
        { message: `${getGroup?.name} already exists` },
        { status: 409 }
      );
    }

    // create
    const result = await prisma.group.create({
      data: { ...newGroup, createdAt: moment.utc() },
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

    // count all groups
    const count = await prisma.group.count({
      where: search ? { name: { contains: search } } : {},
    });

    // get all groups
    const groups = await prisma.group.findMany({
      where: search ? { name: { contains: search } } : {},
      skip: (parseInt(page) - 1) * parseInt(limit),
    });

    return NextResponse.json({
      count,
      data: groups,
    });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
