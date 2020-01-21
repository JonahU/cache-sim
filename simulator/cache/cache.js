const Set = require("./set");
const Address = require("../address");

class Cache {
    constructor(config, myRam) {
        const {
            setsCount: numSets,
            totalBlocks: numBlocks,
            blockSize,
            associativity,
            replacementPolicy
        } = config;
        this.numSets = numSets;
        this.numBlocks = numBlocks;
        this.replacementPolicy = replacementPolicy;
        this.ram = myRam;
        this.setSize = associativity * blockSize;
        this.sets = new Array(numSets);
        for(let index=0; index<numSets; index++) {
            this.sets[index] = new Set(index, blockSize, associativity, replacementPolicy, numSets);
        }
        Object.seal(this.sets);
    }

    getDouble(address) {
        // return double
    }

    setDouble(address, value) {
        const setIndex = Address.toIndex(address, this.setSize);
        const dataBlock = this.sets[setIndex].writeData(value);
        this.ram.setBlock(address, dataBlock);
        // return void
    }

    getBlock(address) {
        // return DataBlock
    }

    setBlock(address, block) {
        // return void
    }
}

module.exports = Cache;