/*
  Warnings:

  - You are about to drop the `DocumentCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DocumentCollection" DROP CONSTRAINT "DocumentCollection_id_documento_fkey";

-- DropForeignKey
ALTER TABLE "DocumentCollection" DROP CONSTRAINT "DocumentCollection_id_pasta_fkey";

-- DropTable
DROP TABLE "DocumentCollection";

-- CreateTable
CREATE TABLE "documento_pasta" (
    "id_documento" INTEGER NOT NULL,
    "id_pasta" INTEGER NOT NULL,

    CONSTRAINT "documento_pasta_pkey" PRIMARY KEY ("id_documento","id_pasta")
);

-- AddForeignKey
ALTER TABLE "documento_pasta" ADD CONSTRAINT "documento_pasta_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id_documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento_pasta" ADD CONSTRAINT "documento_pasta_id_pasta_fkey" FOREIGN KEY ("id_pasta") REFERENCES "pasta"("id_pasta") ON DELETE RESTRICT ON UPDATE CASCADE;
