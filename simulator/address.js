class Address {
    constructor(spec) {
        if (typeof spec === "number") {
            this.blockSize = null;
            this.numSets = null;
            this.value = spec;
        } else {
            this.tag = 0;
            this.index = spec.index;
            this.blockOffset = 0;
            this.blockSize = spec.blockSize;
            this.numSets = spec.numSets;
            this.binary = this._bits();
            this.value = this._value();
            Object.freeze(this);
        }
    }

    _value() {
        return parseInt(this._bits(), 2);
    }

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
        if(numBits === 0) return "";
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

    getTag(numSetsCache) {
        if(arguments.length === 0) return this.tag;
        const indexBinaryLength = Math.log2(numSetsCache);
        this.tag = this.value >> indexBinaryLength;
        return this.tag;
    }

    getIndex(numSetsCache, blockSize) {
        if(arguments.length === 0) return this.index;
        this.numSets = numSetsCache;
        this.blockSize = blockSize;
        this.index = this.value % numSetsCache;

        // set offset and tag if not set yet
        if(this.blockOffset === undefined || this.blockOffset === null) {
            this.blockOffset = this.getBlockOffset(blockSize);
        }
        if(this.tag === undefined || this.tag === null) {
            this.tag = this.getTag(numSetsCache);
        }
        this.numSets = numSetsCache;
        return this.index;
    }

    getBlockOffset(blockSize) {
        if(arguments.length === 0) return this.blockOffset;
        this.blockSize = blockSize;
        this.blockOffset = this.value % (blockSize / SIZEOF_DOUBLE);
        return this.blockOffset;
    }
}

module.exports = Address;