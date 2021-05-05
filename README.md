# Fampay-Interview
> This project contains 2 APIs
> which can be used to GET & SEARCH YouTube videos.

### Tech Stack
* NodeJS
* MySQL
* Express

### Database Setup
Use the `init-db.sql` file, OR run these commands:
```
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
```

### Installation
1) Clone the repo.
2) `npm install`
3) `SET ENVIRONMENT VARIABLES DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, API_KEY`
4) `node app.js`

# Data Infusion
We have a function `dataInfuser` in the file `/data-infuser.js` which hits the Youtube V3 Data API, and get all results, and store these results in the database.
This function is bound to run every 60 seconds, **and uses 3 API Keys**, which is scalable.
<ins>INTERVIEW BONUS POINT 1</ins>

### Exposed End Points
### Get All Videos
File: `/routes/getAll.js`
`curl -X GET http://localhost:8888/getAll`
```
URL: /getAll?page=2      (`page` param is optional)
Method: GET
Response: [videos array sorted by publishedAt and paginated]
[
    {
        id,
        videoId,
        title,
        description,
        thumbnail,
        publishedAt,
    },
    ....
]
```
### Search
File: `/routes/search.js`
`curl -X GET http://localhost:8888/search`
```
URL: /search?q=tea cook
Method: GET
Response: [videos array having keywords `tea` `cook` in their title or description]
[
    {
        id,
        videoId,
        title,
        description,
        thumbnail,
        publishedAt,
    },
    ....
]
```
`(Keywords search works in jumbled order as well)`
<ins>INTERVIEW BONUS POINT 3</ins>

