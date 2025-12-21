-- CreateTable
CREATE TABLE `Stream` (
    `id` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `thumbnailUrl` TEXT NULL,
    `ingressId` VARCHAR(191) NULL,
    `serverUrl` TEXT NULL,
    `streamKey` TEXT NULL,
    `isLive` BOOLEAN NOT NULL DEFAULT false,
    `isChatEnabled` BOOLEAN NOT NULL DEFAULT true,
    `isChatDelayed` BOOLEAN NOT NULL DEFAULT false,
    `isChatFollowersOnly` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Stream_ingressId_key`(`ingressId`),
    UNIQUE INDEX `Stream_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
