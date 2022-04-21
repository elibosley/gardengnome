/*
  Warnings:

  - Added the required column `userId` to the `Garden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PlantLocation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Garden" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Garden_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Garden" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Garden";
DROP TABLE "Garden";
ALTER TABLE "new_Garden" RENAME TO "Garden";
CREATE TABLE "new_PlantLocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "plantId" TEXT NOT NULL,
    "gardenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    CONSTRAINT "PlantLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlantLocation_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlantLocation_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "Garden" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlantLocation" ("createdAt", "gardenId", "id", "plantId", "updatedAt", "x", "y") SELECT "createdAt", "gardenId", "id", "plantId", "updatedAt", "x", "y" FROM "PlantLocation";
DROP TABLE "PlantLocation";
ALTER TABLE "new_PlantLocation" RENAME TO "PlantLocation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
