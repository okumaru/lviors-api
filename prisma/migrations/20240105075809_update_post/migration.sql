/*
  Warnings:

  - You are about to drop the column `image` on the `tblposts` table. All the data in the column will be lost.
  - Added the required column `userid` to the `tblposts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblposts` DROP COLUMN `image`,
    ADD COLUMN `photo` VARCHAR(100) NULL,
    ADD COLUMN `userid` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `tblposts_FK` ON `tblposts`(`userid`);

-- AddForeignKey
ALTER TABLE `tblposts` ADD CONSTRAINT `tblposts_FK` FOREIGN KEY (`userid`) REFERENCES `tblusers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
