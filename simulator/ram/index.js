const DataBlock = require("../data_block");

class Ram {
    constructor(size) {
        this.size = size;
        this.numBlocks = size / SIZEOF_DOUBLE;
        this.data = []; // Object.seal(new Array(this.numBlocks).fill([])); // fill with zeroed array of blocksize? or maybe float64array?
    }

    getBlock(address) {

    }

    setBlock(address, value) {
        this.data[address] = value;
    }
}

module.exports = Ram;