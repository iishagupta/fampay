const { selectMultiple, insertQuery } = require('./db');
const uuid = require('uuid/v4');

const getAllVideos = async (page) => {
    const LIMIT = 10;
    const offset = (page - 1) * 10;
    const query = `SELECT * FROM videos ORDER BY publishedAt DESC LIMIT ?, ?`;
    return await selectMultiple(query, offset, LIMIT);
};

const insertVideos = async (videos) => {
    const getQuery = () => {
        let query = `INSERT INTO videos(id, videoId, title, description, thumbnail, publishedAt) VALUES `;
        videos.forEach(video => { query += '(?, ?, ?, ?, ?, ?),'});
        query = query.slice(0, -1); // remove the traiiling comma
        return query;
    };
    const getArgs = () => {
        return videos
                    .map(video => {
                            const { videoId, title, description, thumbnail, publishedAt } = video;
                            const id = 'VID'+uuid();
                            return [id, videoId, title, description, thumbnail, publishedAt];
                    })
                    .flat(Infinity);
    };
    const query = getQuery();
    const args = getArgs();
    await insertQuery(query, ...args);
};

const getMaxPublishedAt = async () => {
    const query = `SELECT MAX(publishedAt) as maxPublishedAt FROM videos`;
    const results = await selectMultiple(query);
    if(results.length) {
        return results[0].maxPublishedAt;
    } else {
        const now = new Date();
        const yesterday = now - 1000 * 60 * 60 * 24; // current milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs
        return new Date(yesterday);
    }
};

const searchVideos = async (queryString) => {
    const query = `SELECT * FROM videos WHERE MATCH(title, description) AGAINST(? IN NATURAL LANGUAGE MODE)`;
    return selectMultiple(query, queryString);
};

module.exports = {
    getAllVideos,
    insertVideos,
    getMaxPublishedAt,
    searchVideos,
};


