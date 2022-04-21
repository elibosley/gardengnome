import type { Plant, User } from "@prisma/client";

import { prisma } from "~/db.server";
export type { Plant } from "@prisma/client";

export async function getPlantById(id: Plant["id"]) {
  return prisma.plant.findUnique({ where: { id } });
}

export async function createPlant({
  plant,
  userId,
}: {
  plant: Pick<Plant, "name">;
  userId: User["id"];
}) {
  return prisma.plant.create({
    data: {
      ...plant,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deletePlant({
  id,
  userId,
}: Pick<Plant, "id"> & { userId: User["id"] }) {
  return prisma.plant.deleteMany({
    where: { id, userId },
  });
}
