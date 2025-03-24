-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "industryType" DROP NOT NULL,
ALTER COLUMN "industryType" SET DATA TYPE TEXT;
