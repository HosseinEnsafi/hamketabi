/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,bookListId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,bookListId]` on the table `Saved` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commentAbleType` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommentAbleType" AS ENUM ('POST', 'QUOTE', 'BOOKLIST');

-- AlterEnum
ALTER TYPE "LikeableType" ADD VALUE 'BOOKLIST';

-- AlterEnum
ALTER TYPE "SaveableType" ADD VALUE 'BOOKLIST';

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "bookListId" TEXT,
ADD COLUMN     "commentAbleType" "CommentAbleType" NOT NULL,
ADD COLUMN     "quoteId" TEXT,
ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "bookListId" TEXT;

-- AlterTable
ALTER TABLE "Saved" ADD COLUMN     "bookListId" TEXT;

-- CreateTable
CREATE TABLE "BookList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BookList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookListBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookListBooks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookListBooks_B_index" ON "_BookListBooks"("B");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_userId_postId_key" ON "Comment"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_bookListId_key" ON "Like"("userId", "bookListId");

-- CreateIndex
CREATE UNIQUE INDEX "Saved_userId_bookListId_key" ON "Saved"("userId", "bookListId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_bookListId_fkey" FOREIGN KEY ("bookListId") REFERENCES "BookList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_bookListId_fkey" FOREIGN KEY ("bookListId") REFERENCES "BookList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_bookListId_fkey" FOREIGN KEY ("bookListId") REFERENCES "BookList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookList" ADD CONSTRAINT "BookList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookListBooks" ADD CONSTRAINT "_BookListBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookListBooks" ADD CONSTRAINT "_BookListBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "BookList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
