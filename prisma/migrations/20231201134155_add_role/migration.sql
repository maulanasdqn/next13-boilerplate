-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Roles" NOT NULL DEFAULT 'USER';
