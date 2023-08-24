CREATE TABLE `task` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `uuid` text NOT NULL UNIQUE,
    `title` text NOT NULL,
    `description` text,
    `status` text NOT NULL DEFAULT '0',
    `date_created` datetime NOT NULL,
    `date_updated` datetime
) COLLATE 'utf8mb4_general_ci';