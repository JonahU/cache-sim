class Address {
    constructor(setIndex, blockSize, numSets) {
        // TODO: constructor from value
        this.tag = 0;
        this.index = setIndex;
        this.blockOffset = 0;
        this.blockSize = blockSize;
        this.numSets = numSets;
    }

    get bits() { return this._bits(); };
    get value() { return parseInt(this._bits(), 2); };

    _bits() {
        return this._tagBits() + this._indexBits() + this._blockOffsetBits();
    }

    _tagBits() {
        const numBits = SIZEOF_ADDRESS - Math.log2(this.numSets) - Math.log2(this.blockSize);
        let bits = this.tag.toString(2);
        while (bits.length != numBits) bits = "0" + bits;
        return bits;    
    }

    _indexBits() {
        const numBits = Math.log2(this.numSets);
        let bits = this.index.toString(2);
        while (bits.length != numBits) bits = "0" + bits;
        return bits;
    }

    _blockOffsetBits() {
        const numBits = Math.log2(this.blockSize);
        let bits = this.blockOffset.toString(2);
        while (bits.length != numBits) bits = "0" + bits;
        return bits;
    }

    static toIndex(address, numBlocksRam, numSetsCache) {
        const setIndex = Math.floor((address / numBlocksRam) * numSetsCache);
        return setIndex;
    }

    getTag() {
        return this.tag;
    }

    getIndex() {
        return this.index;
    }

    getOffset() {
        return this.blockOffset;
    }
}

module.exports = Address;