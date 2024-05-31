-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistSummary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "ArtistSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongSummary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "SongSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistSummaryInfo" (
    "id" TEXT NOT NULL,
    "numberOfSongs" INTEGER NOT NULL,
    "earlyId" TEXT NOT NULL,
    "lateId" TEXT NOT NULL,
    "popularId" TEXT NOT NULL,

    CONSTRAINT "ArtistSummaryInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtistSummaryInfo_earlyId_key" ON "ArtistSummaryInfo"("earlyId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistSummaryInfo_lateId_key" ON "ArtistSummaryInfo"("lateId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistSummaryInfo_popularId_key" ON "ArtistSummaryInfo"("popularId");

-- AddForeignKey
ALTER TABLE "ArtistSummary" ADD CONSTRAINT "ArtistSummary_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongSummary" ADD CONSTRAINT "SongSummary_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistSummaryInfo" ADD CONSTRAINT "ArtistSummaryInfo_earlyId_fkey" FOREIGN KEY ("earlyId") REFERENCES "SongSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistSummaryInfo" ADD CONSTRAINT "ArtistSummaryInfo_lateId_fkey" FOREIGN KEY ("lateId") REFERENCES "SongSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistSummaryInfo" ADD CONSTRAINT "ArtistSummaryInfo_popularId_fkey" FOREIGN KEY ("popularId") REFERENCES "SongSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
