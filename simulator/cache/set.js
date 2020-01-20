const Address = require("../address");
const Block = require("../data_block");

class CacheSet {
    constructor(index, blockSize, associativity, numSets) {
        this.size = blockSize * associativity;
        this.blockSize = blockSize;
        this.associativity = associativity;
        this.address = new Address(index, blockSize, numSets);
        this.data = new ArrayBuffer(this.size); // or Array[associativity] = ArrayBuffer[blockSize] ?
    }
}

module.exports = CacheSet;