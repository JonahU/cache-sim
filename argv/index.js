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
    if(config.algorithm === "mxm" || config.algorithm === "mxm_block") {
        config.ramSize = (config.dimension*config.dimension)*SIZEOF_DOUBLE*3;
    } else if (config.algorithm === "daxpy") {
        config.ramSize = config.dimension*SIZEOF_DOUBLE*3;
    } else {
        throw new Error(`Unknown algorithm: "${config.algorithm}"`);
    }
    if(config.associativity < 1 || !Number.isInteger(args.associativity))
        throw new Error("Associativity must be more than 0");
    if(!Object.is(config.blockSize%SIZEOF_DOUBLE, +0))
        throw new Error("Block size must be a factor of 8");
    if(!Number.isInteger(config.setsCount))
        throw new Error("Invalid cache size");

    Object.keys(argList).forEach(letter => {
        delete config[letter];
    });
    return config;
};

module.exports = argv;
