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
            block: new DataBlock(blockSize/SIZEOF_DOUBLE)
        }));
        this.replacementPolicy = replacementPolicy;
        this.numSets = numSets;
        this.myRam = myRam;
    }

    getData(address) {
        const tag = address.getTag(this.numSets);
        for(let {address: currentAddress, block} of this.data) {
            if(tag === currentAddress.tag) return block; // HIT
        }
        
        // MISS
        const newBlock = this.myRam.getBlock(address);
        const replaceIndex = 0; // TODO: vary based on replacement policy
        this.data[replaceIndex] = {
            address,
            block: newBlock
        };
        return this.data[replaceIndex].block;
    }

    writeData(newData) {
        const replaceIndex = 0; // TODO: vary based on replacement policy
        const newBlock = new DataBlock(this.blockSize/SIZEOF_DOUBLE);
        newBlock[0] = newData
        this.data[replaceIndex].block = newBlock;
        return this.data[replaceIndex].block;
    }
}

module.exports = CacheSet;