
// FAMPAY INTERVIEW BONUS POINT 1 ##############
// ROUND ROBIN WAY TO GET API KEYS
const { API_KEY } = process.env;

const YOUTUBE_API_KEYS = [
    `${API_KEY}`,
    `${API_KEY}`,
    `${API_KEY}`,
]; // adding more API keys to this array, will increase our usage units, and increase our quota

let idx = 0;

module.exports = () => {
    idx = (idx + 1) % YOUTUBE_API_KEYS.length;
    return YOUTUBE_API_KEYS[idx];
};
