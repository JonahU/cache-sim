const Set = require("./set");
const DataBlock = require("../data_block");

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
        this.blockSize = blockSize;
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
        const setIndex = address.getIndex(this.ram.numBlocks, this.numSets, this.blockSize);
        const dataBlock = this.sets[setIndex].readBlock(address);
        const blockOffset = address.getBlockOffset(this.blockSize);
        return dataBlock[blockOffset];
    }

    setDouble(address, value) {
        const setIndex = address.getIndex(this.ram.numBlocks, this.numSets, this.blockSize);
        const dataBlock = this.sets[setIndex].updateBlock(address, value);
        this.ram.setBlock(address, dataBlock);
    }

    hitsAndMisses() {
        const readHits = this.sets.reduce((accumulator, set) => accumulator + set.readHits, 0);
        const readMisses = this.sets.reduce((accumulator, set) => accumulator + set.readMisses, 0);
        const readTotal = readHits + readMisses;
        const writeHits = this.sets.reduce((accumulator, set) => accumulator + set.writeHits, 0);
        const writeMisses = this.sets.reduce((accumulator, set) => accumulator + set.writeMisses, 0);
        const writeTotal = writeHits + writeMisses;
        return {
            readHits,
            readMisses,
            readMissRate: readMisses / readTotal,
            writeHits,
            writeMisses,
            writeMissRate: writeMisses / writeTotal
        };
    }
}

module.exports = Cache;