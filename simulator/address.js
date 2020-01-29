class Address {
    constructor(spec) {
        if (typeof spec === "number") {
            this._blockSize = null;
            this._numSets = null;
            this.value = spec;
        } else {
            this.tag = 0;
            this.index = spec.index;
            this.blockOffset = 0;
            this._blockSize = spec.blockSize;
            this._numSets = spec.numSets;
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
        const numBits = SIZEOF_ADDRESS - Math.log2(this._numSets) - Math.log2(this._blockSize);
        let bits = this.tag.toString(2);
        while (bits.length != numBits) bits = "0" + bits;
        return bits;    
    }

    _indexBits() {
        const numBits = Math.log2(this._numSets);
        if(numBits === 0) return "";
        let bits = this.index.toString(2);
        while (bits.length != numBits) bits = "0" + bits;
        return bits;
    }

    _blockOffsetBits() {
        const numBits = Math.log2(this._blockSize);
        let bits = this.blockOffset.toString(2);
        while (bits.length != numBits) bits = "0" + bits;
        return bits;
    }

    getTag(numSetsCache) {
        if(arguments.length === 0) return this.tag;
        this.tag = Math.floor(this.value / (this._blockSize/SIZEOF_DOUBLE));
        if(numSetsCache === 1) { // fully associative
            return this.tag;
        }
        // set associative or direct mapped
        this.tag = this.tag % numSetsCache;
        return this.tag;
    }

    getIndex(numSetsCache, blockSize) {
        if(arguments.length === 0) return this.index;
        this._numSets = numSetsCache;
        this._blockSize = blockSize;
        if(this.blockOffset === undefined || this.blockOffset === null) {
            this.blockOffset = this.getBlockOffset(blockSize);
        }

        const blockOffsetBitsCount = Math.log2(blockSize/SIZEOF_DOUBLE)*DOUBLE_BITS_LENGTH;
        this.index = (this.value >> blockOffsetBitsCount)%numSetsCache;

        if(this.tag === undefined || this.tag === null) {
            this.tag = this.getTag(numSetsCache);
        }
        return this.index;
    }

    getBlockOffset(blockSize) {
        if(arguments.length === 0) return this.blockOffset;
        this._blockSize = blockSize;
        this.blockOffset = this.value % (blockSize / SIZEOF_DOUBLE);
        return this.blockOffset;
    }
}

module.exports = Address;