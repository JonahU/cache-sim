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

    getData(address) {
        const tag = address.getTag(this.numSets);
        for(let {address: currentAddress, block} of this.data) {
            if(tag === currentAddress.tag) {
                this.readHits ++;
                return block; // HIT
            }
        }
        
        // MISS
        this.readMisses ++;
        const newBlock = this.myRam.getBlock(address);
        const replaceIndex = 0; // TODO: vary based on replacement policy
        this.data[replaceIndex] = {
            address,
            block: newBlock
        };
        return this.data[replaceIndex].block;
    }

    writeData(address, newData) {
        const replaceIndex = 0; // TODO: vary based on replacement policy
        const newBlock = new DataBlock(this.blockSize/SIZEOF_DOUBLE);
        newBlock[0] = newData
        if (this.data[replaceIndex].valid === true) {
            if(this.data[replaceIndex].address.getTag() === address.getTag()) {
                // HIT
                this.writeHits ++;
            } else {
                // CONFLICT MISS
                this.writeMisses ++;
                this.data[replaceIndex].address = address;
            }
        } else {
            // COMPULSORY MISS
            this.writeMisses ++;
            this.data[replaceIndex].address = address;
            this.data[replaceIndex].valid = true;
        }
        this.data[replaceIndex].block = newBlock;
        return this.data[replaceIndex].block;
    }
}

module.exports = CacheSet;