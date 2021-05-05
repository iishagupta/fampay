const axios = require('axios');
const getAPIKey = require('./get-api-key');
const { insertVideos, getMaxPublishedAt } = require('./dao');

const KEYWORD = 'cooking';

const getYoutubeJSON = async (url, params) => {
    try {
        const response = await axios.get(url, { params });
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Status Code is ${response.status}; Response is ${response && response.data}`);
        }
    } catch(e) {
        console.log(`ERROR while hitting Youtube API`);
        console.log(e);
        return null;
    }
};

const storeData = async (json) => {
    const { items } = json;
    const videos = items.map(item => {
        const { id, snippet } = item;
        const { videoId } = id;
        const { title, description, thumbnails, publishedAt } = snippet;
        const thumbnail = thumbnails.high.url;
        const sanitizedTitle = title.split(/[^A-z 0-9]/).join('').replace(/ +(?= )/g,'');
        const sanitizedDescription = description.split(/[^A-z 0-9]/).join('').replace(/ +(?= )/g,'');
        return {
            videoId,
            title: sanitizedTitle,
            description: sanitizedTitle,
            thumbnail,
            publishedAt: new Date(publishedAt)
        };
    });
    await insertVideos(videos); // insert video inside DB
    console.log(`Inserted ${items.length} videos in DB`);
};

const dataInfuser = async () => {
    const apiKey = getAPIKey();
    const url = `https://www.googleapis.com/youtube/v3/search`;
    const publishedAfter = await getMaxPublishedAt();
    const queryParams = {
        q: KEYWORD,
        key: apiKey,
        type: 'video',
        order: 'date',
        maxResults: 50,
        order: 'date',
        part: 'snippet',
        publishedAfter,
    };
    const json = await getYoutubeJSON(url, queryParams);
    if(json !== null) {
        await storeData(json);
    }
};

module.exports = dataInfuser;
