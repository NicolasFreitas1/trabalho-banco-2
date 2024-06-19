-- CreateEnum
CREATE TYPE "tp_usario" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "tp_acesso" AS ENUM ('VIEW', 'EDIT');

-- CreateEnum
CREATE TYPE "tp_permissao" AS ENUM ('READ', 'WRITE');

-- CreateTable
CREATE TABLE "documento" (
    "id_documento" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT NOT NULL,
    "caminho_arquivo" VARCHAR(255) NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_modificacao" TIMESTAMP(3) NOT NULL,
    "id_propretario" INTEGER NOT NULL,
    "id_tipo_documento" INTEGER NOT NULL,

    CONSTRAINT "documento_pkey" PRIMARY KEY ("id_documento")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "dt_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tp_usuario" "tp_usario" NOT NULL DEFAULT 'USER',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "tag" (
    "id_tag" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "DocumentTag" (
    "id_documento" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,

    CONSTRAINT "DocumentTag_pkey" PRIMARY KEY ("id_documento","id_tag")
);

-- CreateTable
CREATE TABLE "log_acesso" (
    "id_log" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_documento" INTEGER NOT NULL,
    "dt_acesso" TIMESTAMP(3) NOT NULL,
    "tp_acesso" "tp_acesso" NOT NULL,

    CONSTRAINT "log_acesso_pkey" PRIMARY KEY ("id_log")
);

-- CreateTable
CREATE TABLE "pasta" (
    "id_pasta" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT NOT NULL,
    "id_pasta_pai" INTEGER NOT NULL,
    "id_propretario" INTEGER NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pasta_pkey" PRIMARY KEY ("id_pasta")
);

-- CreateTable
CREATE TABLE "tipo_documento" (
    "id_tipo_documento" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "tipo_documento_pkey" PRIMARY KEY ("id_tipo_documento")
);

-- CreateTable
CREATE TABLE "permissao" (
    "id_permissao" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_documento" INTEGER,
    "id_pasta" INTEGER,
    "tp_permissao" "tp_permissao" NOT NULL,

    CONSTRAINT "permissao_pkey" PRIMARY KEY ("id_permissao")
);

-- CreateTable
CREATE TABLE "versao" (
    "id_versao" SERIAL NOT NULL,
    "id_documento" INTEGER NOT NULL,
    "numero_versao" INTEGER NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao_alteracao" TEXT NOT NULL,

    CONSTRAINT "versao_pkey" PRIMARY KEY ("id_versao")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_id_tipo_documento_fkey" FOREIGN KEY ("id_tipo_documento") REFERENCES "tipo_documento"("id_tipo_documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_id_propretario_fkey" FOREIGN KEY ("id_propretario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id_documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "tag"("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_acesso" ADD CONSTRAINT "log_acesso_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id_documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_acesso" ADD CONSTRAINT "log_acesso_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pasta" ADD CONSTRAINT "pasta_id_propretario_fkey" FOREIGN KEY ("id_propretario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pasta" ADD CONSTRAINT "pasta_id_pasta_pai_fkey" FOREIGN KEY ("id_pasta_pai") REFERENCES "pasta"("id_pasta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissao" ADD CONSTRAINT "permissao_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id_documento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissao" ADD CONSTRAINT "permissao_id_pasta_fkey" FOREIGN KEY ("id_pasta") REFERENCES "pasta"("id_pasta") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissao" ADD CONSTRAINT "permissao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "versao" ADD CONSTRAINT "versao_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id_documento") ON DELETE RESTRICT ON UPDATE CASCADE;
