CREATE DATABASE fampay;
USE fampay;

CREATE TABLE videos(
    id VARCHAR(255) NOT NULL,
    videoId VARCHAR(255) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    publishedAt DATETIME NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isActive TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY(id),
    KEY `fampay_videos_videoId` (`videoId`),
    KEY `fampay_videos_publishedAt` (`publishedAt`), # to get the max publishedAt while hitting YT API
    KEY `fampay_videos_isActive` (`isActive`),
    ### FAMPAY INTERVIEW BONUS POINT 3 [Starts] ##############
    FULLTEXT(title, description) # to search by jumbled keywords
    ### FAMPAY INTERVIEW BONUS POINT 3 [Ends] ##############
);
