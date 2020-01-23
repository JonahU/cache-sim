const DataBlock = require("../data_block");

class Ram {
    constructor({ ramSize, blockSize }) {
        this.size = ramSize;
        this.blockSize = blockSize;
        this.numBlocks = ramSize / SIZEOF_DOUBLE;
        this.data = new DataBlock(this.numBlocks);
    }

    getBlock(address) {
        return this.data.subarray(address.value, address.value + this.blockSize/SIZEOF_DOUBLE); // TODO: block offset in ram?
    }

    setBlock(address, value) {
        const dataFromBlock = value.subarray(address.blockOffset, address.blockOffset+1);
        this.data.set(dataFromBlock, address.value);
    }
}

module.exports = Ram;