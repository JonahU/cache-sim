const Set = require("./set");

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
        this.associativity = associativity;
        this.replacementPolicy = replacementPolicy;
        this.ram = myRam;
        this.setSize = associativity * blockSize;
        this.sets = new Array(numSets);
        for(let index=0; index<numSets; index++) {
            this.sets[index] = new Set(
                index,
                blockSize,
                associativity,
                replacementPolicy,
                numSets,
                myRam
            );
        }
        Object.seal(this.sets);
    }

    getDouble(address) {
        const setIndex = address.getIndex(this.ram.numBlocks, this.numSets);
        const dataBlock = this.sets[setIndex].getData(address);
        const blockOffset = 0; // TODO: placeholder
        return dataBlock[blockOffset];
    }

    setDouble(address, value) {
        const setIndex = address.getIndex(this.ram.numBlocks, this.numSets);
        const dataBlock = this.sets[setIndex].writeData(value);
        this.ram.setBlock(address, dataBlock);
    }
}

module.exports = Cache;