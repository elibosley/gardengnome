/*
  Warnings:

  - Added the required column `name` to the `Garden` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Garden" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Garden" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Garden";
DROP TABLE "Garden";
ALTER TABLE "new_Garden" RENAME TO "Garden";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
