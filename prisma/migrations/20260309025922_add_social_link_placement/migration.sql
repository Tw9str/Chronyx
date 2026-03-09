-- AlterTable
ALTER TABLE "social_links" ADD COLUMN     "showInContact" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showInFooter" BOOLEAN NOT NULL DEFAULT true;
