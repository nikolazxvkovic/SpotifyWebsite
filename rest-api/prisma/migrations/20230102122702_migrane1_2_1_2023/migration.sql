/*
  Warnings:

  - You are about to drop the `ArtistSummaryInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtistSummaryInfo" DROP CONSTRAINT "ArtistSummaryInfo_earlyId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistSummaryInfo" DROP CONSTRAINT "ArtistSummaryInfo_lateId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistSummaryInfo" DROP CONSTRAINT "ArtistSummaryInfo_popularId_fkey";

-- DropTable
DROP TABLE "ArtistSummaryInfo";
