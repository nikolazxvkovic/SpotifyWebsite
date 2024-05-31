/*
  Warnings:

  - You are about to drop the `ArtistSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SongSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistSummaryToSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtistSummaryInfo" DROP CONSTRAINT "ArtistSummaryInfo_earlyId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistSummaryInfo" DROP CONSTRAINT "ArtistSummaryInfo_lateId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistSummaryInfo" DROP CONSTRAINT "ArtistSummaryInfo_popularId_fkey";

-- DropForeignKey
ALTER TABLE "SongSummary" DROP CONSTRAINT "SongSummary_artistId_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistSummaryToSong" DROP CONSTRAINT "_ArtistSummaryToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistSummaryToSong" DROP CONSTRAINT "_ArtistSummaryToSong_B_fkey";

-- DropTable
DROP TABLE "ArtistSummary";

-- DropTable
DROP TABLE "SongSummary";

-- DropTable
DROP TABLE "_ArtistSummaryToSong";

-- CreateTable
CREATE TABLE "_ArtistToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToSong_AB_unique" ON "_ArtistToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToSong_B_index" ON "_ArtistToSong"("B");

-- AddForeignKey
ALTER TABLE "ArtistSummaryInfo" ADD CONSTRAINT "ArtistSummaryInfo_earlyId_fkey" FOREIGN KEY ("earlyId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistSummaryInfo" ADD CONSTRAINT "ArtistSummaryInfo_lateId_fkey" FOREIGN KEY ("lateId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistSummaryInfo" ADD CONSTRAINT "ArtistSummaryInfo_popularId_fkey" FOREIGN KEY ("popularId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToSong" ADD CONSTRAINT "_ArtistToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToSong" ADD CONSTRAINT "_ArtistToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
