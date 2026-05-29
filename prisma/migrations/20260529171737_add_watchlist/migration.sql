-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('PLANNED', 'WATCHED');

-- CreateTable
CREATE TABLE "watchlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "status" "WatchStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "watchlist_userId_idx" ON "watchlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_userId_movieId_key" ON "watchlist"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
