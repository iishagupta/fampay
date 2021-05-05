const { getAllVideos } = require('../dao');

const sanitizePage = (page) => {
    if(typeof page === 'string') {
        const allDigits = /^\d{1,}$/;
        if(allDigits.test(page) && page > 1) {
            return parseInt(page);
        }
    }
    if(typeof page === 'number' && page > 1) {
        return page;
    }
    return 1;
};

const requestHandler = async (req, res) => {
    const page = sanitizePage(req.query.page);
    const videos = await getAllVideos(page);
    res.send(videos);
};

module.exports = requestHandler;
