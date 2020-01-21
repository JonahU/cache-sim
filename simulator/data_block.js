class DataBlock extends Float64Array {
    toArray() {
        return Array.from(this);
    }
}

module.exports = DataBlock;