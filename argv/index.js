const minimist = require("minimist");
const configFile = require("../config");

const argList = {
    c: "cacheSize",
    b: "blockSize",
    n: "associativity",
    r: "replacementPolicy",
    a: "algorithm",
    d: "dimension",
    p: "printSolution",
    f: "blockingFactor"
};

const configSchema = {
    ramSize: 0,
    cacheSize: 0,
    blockSize: 0,
    totalBlocks: 0,
    associativity: 0,
    setsCount: 0,
    replacementPolicy: "",
    algorithm: "",
    blockingFactor: 0,
    dimension: "",
    printSolution: false
}

const argv = () => {
    const args = minimist(process.argv.slice(2), {
        alias: argList,
        string: ["a", "r"],
        boolean: ["p"],
        unknown: () => false
    });
    delete args._;

    const config = { ...configSchema, ...configFile, ...args };
    config.totalBlocks = config.cacheSize / config.blockSize;
    config.setsCount = config.totalBlocks / config.associativity;
    // TODO: config.ramSize <- depends on algorithm
    Object.keys(argList).forEach(letter => {
        delete config[letter];
    });
    return config;
};

module.exports = argv;
