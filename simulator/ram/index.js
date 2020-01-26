const DataBlock = require("../data_block");

class Ram {
    constructor({ ramSize, blockSize }) {
        this.size = ramSize;
        this.blockSize = blockSize;
        this.numBlocks = ramSize / SIZEOF_DOUBLE;
        this.data = new DataBlock(this.numBlocks);
    }

    getBlock(address) {
        const blockStart = address.value - address.blockOffset;
        const blockEnd = blockStart + this.blockSize / SIZEOF_DOUBLE;
        return this.data.subarray(blockStart, blockEnd);
    }

    setBlock(address, value) {
        const dataFromBlock = value.subarray(address.blockOffset, address.blockOffset+1);
        this.data.set(dataFromBlock, address.value);
    }

    setDouble(address, value) {
        this.data[address.value] = value;
    }
}

module.exports = Ram;