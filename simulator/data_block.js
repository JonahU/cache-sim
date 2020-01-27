class DataBlock extends Float64Array {
    copy() {
        return Array.from(this);
    }
}

module.exports = DataBlock;