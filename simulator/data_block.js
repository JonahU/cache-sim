class DataBlock {
    constructor(size, data = new Array(size)) {
        this.size = size;
        this.data = data;
    }
}

module.exports = DataBlock;