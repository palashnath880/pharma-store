import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const newUser = await req.json();

    // get user by email
    const getUserByEmail = await prisma.user.findUnique({
      where: { email: newUser?.email },
    });

    // if user has at this email
    if (getUserByEmail) {
      return NextResponse.json(
        { message: `User exists at this email` },
        { status: 400 }
      );
    }

    // encrypted password
    const salt = await genSalt(10);
    const hashPwd = await hash(newUser?.password, salt);

    newUser.password = hashPwd;

    // create user
    const result = await prisma.user.create({ data: newUser });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
