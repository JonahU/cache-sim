const Cache = require("./cache");
const Cpu = require("./cpu");
const Ram = require("./ram");

const start = config => {
    const myRam = new Ram(config);
    const myCache = new Cache(config, myRam);
    const myCpu = new Cpu(config, myCache);
    myCpu.runAlgorithm();
};

module.exports = { start };