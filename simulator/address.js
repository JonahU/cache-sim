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
            this.value = parseInt(this._bits(), 2);
            Object.freeze(this);
        }
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

    getIndex(numBlocksRam, numSetsCache, blockSize) {
        if(arguments.length === 0) return this.index;
        // TODO: no index bits in a fully associative cache
        this.index = Math.floor((this.value / numBlocksRam) * numSetsCache);
        if(this.tag === undefined || this.tag === null) {
            this.tag = this.getTag(numSetsCache);
        }
        if(this.blockOffset === undefined || this.blockOffset === null) {
            this.blockOffset = this.getBlockOffset(blockSize);
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