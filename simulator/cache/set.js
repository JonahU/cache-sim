const Address = require("../address");
// const Block = require("../data_block");

class CacheSet {
    constructor(index, blockSize, associativity, replacementPolicy, numSets) {
        this.size = blockSize * associativity;
        this.blockSize = blockSize;
        this.associativity = associativity;
        this.address = new Address(index, blockSize, numSets);
        this.data = Object.seal(new Array(associativity).fill(new Float64Array(blockSize/SIZEOF_DOUBLE)));
        this.replacementPolicy = replacementPolicy;
    }

    writeData(newData) {
        const replaceIndex = 0; // TODO: vary based on replacement policy
        this.data[replaceIndex][0] = newData;
        return Array.from(this.data[0]);
    }
}

module.exports = CacheSet;