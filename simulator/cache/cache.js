const Set = require('./set');

class Cache {
    constructor(config) {
        const {
            setsCount: numSets,
            totalBlocks: numBlocks,
            blockSize,
            cacheSize,
            associativity,
            replacementPolicy
        } = config;
        this.numSets = numSets;
        this.numBlocks = numBlocks;
        this.sets = new Array(numSets);
        for(let index=0; index<numSets; index++) {
            this.sets[index] = new Set(index, blockSize, associativity, numSets);
        }
        this.replacementPolicy = replacementPolicy;
    }

    getDouble(address) {
        // return double
    }

    setDouble(address, value) {
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