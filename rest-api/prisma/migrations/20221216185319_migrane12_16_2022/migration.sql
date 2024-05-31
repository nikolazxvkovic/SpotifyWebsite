-- DropForeignKey
ALTER TABLE "ArtistSummary" DROP CONSTRAINT "ArtistSummary_songId_fkey";

-- CreateTable
CREATE TABLE "_ArtistSummaryToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistSummaryToSong_AB_unique" ON "_ArtistSummaryToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistSummaryToSong_B_index" ON "_ArtistSummaryToSong"("B");

-- AddForeignKey
ALTER TABLE "_ArtistSummaryToSong" ADD CONSTRAINT "_ArtistSummaryToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "ArtistSummary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistSummaryToSong" ADD CONSTRAINT "_ArtistSummaryToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
