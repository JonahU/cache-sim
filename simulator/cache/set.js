const Address = require("../address");
const DataBlock = require("../data_block");
const Replacement = require("./replacement");

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
        this.data = Object.seal(new Array(associativity).fill().map(() => ({
            address: new Address({index, blockSize, numSets}), // dummy address
            block: new DataBlock(blockSize/SIZEOF_DOUBLE),
            valid: false,
        })));
        this.replacementPolicy = replacementPolicy;
        this.replacement = new Replacement(associativity, replacementPolicy);
        this.numSets = numSets;
        this.myRam = myRam;
        this.readHits = 0;
        this.readMisses = 0;
        this.writeHits = 0;
        this.writeMisses = 0;
    }

    readBlock(address) {
        const tag = address.getTag();
        for(let {address: currentAddress, block, valid} of this.data) {
            if(tag === currentAddress.tag && valid) {
                // HIT
                this.readHits ++;
                this.replacement.dataWillBeRead(address.tag);
                return block;
            }
        }
        
        // MISS
        this.readMisses ++;
        const newBlock = this.myRam.getBlock(address);
        const replaceIndex = this.replacement.dataWillBeWritten(address.tag);
        this.data[replaceIndex].valid = false;
        return this.writeBlock(address, newBlock, replaceIndex);
    }

    writeBlock(address, newBlock, replaceIndex) {
        this.data[replaceIndex].address = address;
        this.data[replaceIndex].valid = true;
        this.data[replaceIndex].block.set(newBlock, 0);
        return this.data[replaceIndex].block;
    }

    updateBlock(address, newValue) {
        let emptyBlock = null;
        const tag = address.getTag();
        const offset = address.getBlockOffset();
        for(let i=0; i<this.data.length; i++) {
            const {address: currentAddress, valid} = this.data[i];
            if(tag === currentAddress.tag && valid) {
                // HIT
                this.writeHits ++;
                this.data[i].block[offset] = newValue;
                return this.data[i].block;
            } else if (!valid) {
                emptyBlock = i;
                break;
            }
        }

        // COMPULSORY MISS
        if (emptyBlock !== null) {
            const blockToWriteTo = emptyBlock;
            this.replacement.dataWillBeWritten(address.tag, blockToWriteTo);
            this.writeMisses ++;
            this.data[blockToWriteTo].address = address;
            this.data[blockToWriteTo].valid = true;
            this.data[blockToWriteTo].block[offset] = newValue;
            emptyBlock = null;
            return this.data[blockToWriteTo].block;
        }

        // CONFLICT MISS
        const replaceIndex = this.replacement.dataWillBeWritten(address.tag);
        this.writeMisses++;
        const replacementBlock = this.myRam.getBlock(address);
        replacementBlock[offset] = newValue;
        return this.writeBlock(address, replacementBlock, replaceIndex);
    }
}

module.exports = CacheSet;