-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('NEW_COMPANY', 'UPDATE_COMPANY', 'NEW_DOMAIN', 'UPDATE_DOMAIN');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "institution" TEXT,
    "department" TEXT,
    "level" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "companyPhotos" TEXT[],
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "x" TEXT,
    "linkedIn" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "otherOfficeLocations" TEXT[],
    "industryType" TEXT[],
    "companySize" TEXT,
    "established" TIMESTAMP(3),
    "techStacks" TEXT[],
    "perks" TEXT[],
    "team" TEXT[],
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "searchVector" tsvector,
    "avgRating" DOUBLE PRECISION,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requirements" TEXT,
    "perks" TEXT[],
    "stipend" BOOLEAN NOT NULL DEFAULT false,
    "stipendAmount" DECIMAL(65,30),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "searchVector" tsvector,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "type" "SubmissionType" NOT NULL,
    "data" JSONB NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "adminFeedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DomainToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DomainToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_fullName_idx" ON "User"("fullName");

-- CreateIndex
CREATE INDEX "User_institution_idx" ON "User"("institution");

-- CreateIndex
CREATE INDEX "User_department_idx" ON "User"("department");

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "Company"("name");

-- CreateIndex
CREATE INDEX "Company_city_idx" ON "Company"("city");

-- CreateIndex
CREATE INDEX "Company_state_idx" ON "Company"("state");

-- CreateIndex
CREATE INDEX "Company_country_idx" ON "Company"("country");

-- CreateIndex
CREATE INDEX "Company_verified_idx" ON "Company"("verified");

-- CreateIndex
CREATE INDEX "Company_industryType_idx" ON "Company"("industryType");

-- CreateIndex
CREATE INDEX "Company_techStacks_idx" ON "Company"("techStacks");

-- CreateIndex
CREATE INDEX "Company_avgRating_idx" ON "Company"("avgRating");

-- CreateIndex
CREATE INDEX "Company_totalReviews_idx" ON "Company"("totalReviews");

-- CreateIndex
CREATE INDEX "Company_searchVector_idx" ON "Company" USING GIN ("searchVector");

-- CreateIndex
CREATE INDEX "Domain_name_idx" ON "Domain"("name");

-- CreateIndex
CREATE INDEX "Domain_active_idx" ON "Domain"("active");

-- CreateIndex
CREATE INDEX "Domain_stipend_idx" ON "Domain"("stipend");

-- CreateIndex
CREATE INDEX "Domain_companyId_idx" ON "Domain"("companyId");

-- CreateIndex
CREATE INDEX "Domain_searchVector_idx" ON "Domain" USING GIN ("searchVector");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_count_idx" ON "Tag"("count");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_companyId_key" ON "Review"("userId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_domainId_key" ON "Bookmark"("userId", "domainId");

-- CreateIndex
CREATE INDEX "_DomainToTag_B_index" ON "_DomainToTag"("B");

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DomainToTag" ADD CONSTRAINT "_DomainToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DomainToTag" ADD CONSTRAINT "_DomainToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add the searchVector column to the Company table if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Company' AND column_name='searchVector') THEN
    ALTER TABLE "Company" ADD COLUMN "searchVector" tsvector;
  END IF;
END
$$;

-- Create the search vector update function for the Company table
CREATE OR REPLACE FUNCTION company_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.searchVector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.requirements, '')), 'C');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Create the trigger for the Company table
CREATE TRIGGER company_search_vector_update
  BEFORE INSERT OR UPDATE ON "Company"
  FOR EACH ROW
  EXECUTE FUNCTION company_search_vector_update();

-- Add the searchVector column to the Domain table if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Domain' AND column_name='searchVector') THEN
    ALTER TABLE "Domain" ADD COLUMN "searchVector" tsvector;
  END IF;
END
$$;

-- Create the search vector update function for the Domain table
CREATE OR REPLACE FUNCTION domain_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.searchVector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.requirements, '')), 'C');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Create the trigger for the Domain table
CREATE TRIGGER domain_search_vector_update
  BEFORE INSERT OR UPDATE ON "Domain"
  FOR EACH ROW
  EXECUTE FUNCTION domain_search_vector_update();

-- -- DropTrigger
-- DROP TRIGGER IF EXISTS company_search_vector_update ON "Company";
-- DROP TRIGGER IF EXISTS domain_search_vector_update ON "Domain";

-- -- DropFunction
-- DROP FUNCTION IF EXISTS company_search_vector_update();
-- DROP FUNCTION IF EXISTS domain_search_vector_update();

-- -- DropIndex
-- DROP INDEX IF EXISTS "Company_searchVector_idx";
-- DROP INDEX IF EXISTS "Domain_searchVector_idx";

-- -- AlterTable
-- ALTER TABLE "Company" DROP COLUMN IF EXISTS "searchVector";
-- ALTER TABLE "Domain" DROP COLUMN IF EXISTS "searchVector";