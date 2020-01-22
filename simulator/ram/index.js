const DataBlock = require("../data_block");

class Ram {
    constructor({ ramSize, blockSize }) {
        this.size = ramSize;
        this.blockSize = blockSize;
        this.numBlocks = ramSize / SIZEOF_DOUBLE;
        this.data = new DataBlock(this.numBlocks);
    }

    getBlock(address) {
        return this.data[address.value];
    }

    setBlock(address, value) {
        const dataFromBlock = value.subarray(0, 1);
        this.data.set(dataFromBlock, address.value);
    }
}

module.exports = Ram;