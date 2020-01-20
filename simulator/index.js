const Cache = require('./cache');

const start = config => {
    const myCache = new Cache(config);
};

module.exports = { start };