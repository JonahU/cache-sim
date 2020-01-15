const minimist = require("minimist");
const defaults = require("./config");

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

const args = minimist(process.argv.slice(2), {
    alias: argList,
    string: ["a", "r"],
    boolean: ["p"],
    unknown: () => false
});
delete args._;

const config = { ...defaults, ...args };
config.totalBlocks = config.cacheSize / config.blockSize;
config.setsCount = config.totalBlocks / config.associativity;
// TODO: config.ramSize <- depends on algorithm
Object.keys(argList).forEach(letter => {
    delete config[letter];
});

console.log("======INPUTS======");
console.log(config);
