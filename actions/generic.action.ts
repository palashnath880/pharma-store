"use server";

import prisma from "@/lib/prisma";

export const getGenericById = async (id: string) => {
  const res = await prisma.generic.findUnique({ where: { id } });
  return res;
};
