/*
  Warnings:

  - You are about to drop the `GroupSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupSubject" DROP CONSTRAINT "GroupSubject_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupSubject" DROP CONSTRAINT "GroupSubject_subjectId_fkey";

-- DropTable
DROP TABLE "GroupSubject";

-- CreateTable
CREATE TABLE "SubjectGroup" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "SubjectGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubjectGroup" ADD CONSTRAINT "SubjectGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectGroup" ADD CONSTRAINT "SubjectGroup_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
