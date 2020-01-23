const Address = require("../address");
const DataBlock = require("../data_block");

class CacheSet {
    constructor(
        index,
        blockSize,
        associativity,
        replacementPolicy,
        numSets,
        myRam
    ) {
        this.size = blockSize * associativity;
        this.blockSize = blockSize;
        this.associativity = associativity;
        this.data = Object.seal(new Array(associativity).fill({
            address: new Address({index, blockSize, numSets}),
            block: new DataBlock(blockSize/SIZEOF_DOUBLE),
            valid: false
        }));
        this.replacementPolicy = replacementPolicy;
        this.numSets = numSets;
        this.myRam = myRam;
        this.readHits = 0;
        this.readMisses = 0;
        this.writeHits = 0;
        this.writeMisses = 0;
    }

    get replaceIndex() {
        if(this.associativity === 1) return 0;
        switch(this.replacementPolicy) {
            // TODO
            case "LRU":
                break;
            case "FIFO":
                break;
            case "random":
                return Math.floor(Math.random() * this.associativity);
            default:
                throw new Error(`Uknown replacement policy "${this.replacementPolicy}"`);
        }
    }

    readBlock(address) {
        const tag = address.getTag();
        for(let {address: currentAddress, block} of this.data) {
            if(tag === currentAddress.tag) {
                // HIT
                this.readHits ++;
                return block;
            }
        }
        
        // MISS
        this.readMisses ++;
        const newBlock = this.myRam.getBlock(address);
        const replaceIndex = 0; // TODO: vary based on replacement policy
        this.data[replaceIndex].valid = false;
        this.writeBlock(address, newBlock, replaceIndex);
        return this.readBlock(address);
    }

    writeBlock(address, newBlock, replaceIndex) {
        this.data[replaceIndex].address = address;
        this.data[replaceIndex].valid = true;
        this.data[replaceIndex].block = newBlock;
        return this.data[replaceIndex].block;
    }

    updateBlock(address, newValue) {
        const replaceIndex = 0; // TODO: vary replacement based on replacement policy
        const offset = address.getBlockOffset();
        if (this.data[replaceIndex].valid === true) {
            if(this.data[replaceIndex].address.getTag() !== address.getTag()) {
                // CONFLICT MISS
                this.writeMisses++;
                const replacementBlock = this.myRam.getBlock(address);
                replacementBlock[offset] = newValue;
                return this.writeBlock(address, replacementBlock, replaceIndex);
            } else {
                // HIT
                this.writeHits ++;
            }
        } else {
            // COMPULSORY MISS
            this.writeMisses ++;
            this.data[replaceIndex].address = address;
            this.data[replaceIndex].valid = true;
        }
        this.data[replaceIndex].block[offset] = newValue;
        return this.data[replaceIndex].block;
    }
}

module.exports = CacheSet;