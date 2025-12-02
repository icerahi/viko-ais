/*
  Warnings:

  - The primary key for the `Grade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `Grade` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupId,subjectId]` on the table `SubjectGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_pkey",
DROP COLUMN "int",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Grade_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectGroup_groupId_subjectId_key" ON "SubjectGroup"("groupId", "subjectId");
