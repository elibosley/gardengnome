import type { Garden, User } from "@prisma/client";

import { prisma } from "~/db.server";
export type { Garden } from "@prisma/client";

export async function getGarden({
  id,
  userId,
}: {
  id: Garden["id"];
  userId: User["id"];
}) {
  return prisma.garden.findFirst({ where: { id, userId } });
}

export async function deleteGarden({
  id,
  userId,
}: {
  id: Garden["id"];
  userId: User["id"];
}) {
  return prisma.garden.deleteMany({ where: { id, userId } });
}

export async function createGarden({
  garden,
  userId,
}: {
  garden: Pick<Garden, "name">;
  userId: User["id"];
}) {
  return prisma.garden.create({
    data: {
      ...garden,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function getGardenListItems({ userId }: { userId: User["id"] }) {
  return prisma.garden.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}
