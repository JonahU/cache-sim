const Address = require("../address");
const DataBlock = require("../data_block");

class CacheSet {
    constructor(index, blockSize, associativity, replacementPolicy, numSets) {
        this.size = blockSize * associativity;
        this.blockSize = blockSize;
        this.associativity = associativity;
        this.address = new Address(index, blockSize, numSets);
        this.data = Object.seal(new Array(associativity).fill(new DataBlock(blockSize/SIZEOF_DOUBLE)));
        this.replacementPolicy = replacementPolicy;
    }

    writeData(newData) {
        const replaceIndex = 0; // TODO: vary based on replacement policy
        const newBlock = new DataBlock(this.blockSize/SIZEOF_DOUBLE);
        newBlock[0] = newData
        this.data[replaceIndex] = newBlock;
        return this.data[replaceIndex];
    }
}

module.exports = CacheSet;