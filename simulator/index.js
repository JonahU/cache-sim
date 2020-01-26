const Cache = require("./cache");
const Cpu = require("./cpu");
const Ram = require("./ram");

const simulator = config => {
    let myCpu;

    const start = () => {
        const myRam = new Ram(config);
        const myCache = new Cache(config, myRam);
        myCpu = new Cpu(config, myCache, myRam);
        myCpu.runAlgorithm();
        return {
            instructionCount: myCpu.instructionCount,
            ...myCache.hitsAndMisses()
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