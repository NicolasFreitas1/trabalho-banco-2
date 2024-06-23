-- CreateTable
CREATE TABLE "DocumentCollection" (
    "id_documento" INTEGER NOT NULL,
    "id_pasta" INTEGER NOT NULL,

    CONSTRAINT "DocumentCollection_pkey" PRIMARY KEY ("id_documento","id_pasta")
);

-- AddForeignKey
ALTER TABLE "DocumentCollection" ADD CONSTRAINT "DocumentCollection_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id_documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentCollection" ADD CONSTRAINT "DocumentCollection_id_pasta_fkey" FOREIGN KEY ("id_pasta") REFERENCES "pasta"("id_pasta") ON DELETE RESTRICT ON UPDATE CASCADE;
