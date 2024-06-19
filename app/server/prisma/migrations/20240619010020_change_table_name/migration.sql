/*
  Warnings:

  - You are about to drop the `DocumentTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DocumentTag" DROP CONSTRAINT "DocumentTag_id_documento_fkey";

-- DropForeignKey
ALTER TABLE "DocumentTag" DROP CONSTRAINT "DocumentTag_id_tag_fkey";

-- DropTable
DROP TABLE "DocumentTag";

-- CreateTable
CREATE TABLE "documento_tag" (
    "id_documento" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,

    CONSTRAINT "documento_tag_pkey" PRIMARY KEY ("id_documento","id_tag")
);

-- AddForeignKey
ALTER TABLE "documento_tag" ADD CONSTRAINT "documento_tag_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id_documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento_tag" ADD CONSTRAINT "documento_tag_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "tag"("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE;
