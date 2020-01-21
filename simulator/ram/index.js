const DataBlock = require("../data_block");

class Ram {
    constructor({ ramSize, blockSize }) {
        this.size = ramSize;
        this.blockSize = blockSize;
        this.numBlocks = ramSize / SIZEOF_DOUBLE;
        this.data = new DataBlock(this.numBlocks);
    }

    getBlock(address) {

    }

    setBlock(address, value) {
        const toSet = value.subarray(0, 1);
        this.data.set(toSet, address);
    }
}

module.exports = Ram;