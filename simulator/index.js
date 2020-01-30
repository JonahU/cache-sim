const Cache = require("./cache");
const Cpu = require("./cpu");
const Ram = require("./ram");

const simulator = config => {
    let myCpu;

    const start = () => {
        // setup timer
        const startTime = Date.now();

        // setup & run simulator
        const myRam = new Ram(config);
        const myCache = new Cache(config, myRam);
        myCpu = new Cpu(config, myCache, myRam);
        myCpu.runAlgorithm();

        // stop timer and calculate time taken
        const endTime = Date.now();
        const totalTime = new Date(endTime - startTime);
        const minutes = totalTime.getUTCMinutes();
        const seconds = totalTime.getUTCSeconds();
        const timeTaken = minutes > 0 ?
            `${minutes}m, ${seconds}s` :
            `${seconds}s`;
        return {
            instructionCount: myCpu.instructionCount,
            ...myCache.hitsAndMisses(),
            timeTaken
        }
    };

    const printSolution = () => {
        myCpu.printSolution()
    }

    return {
        start,
        printSolution
    }
}

module.exports = simulator;