const Address = require("../address");
const programs = require("./programs");

class Cpu {
    constructor(config, myCache) {
        this.algorithm = config.algorithm;
        this.algorithmDimension = config.dimension;
        this.blockingFactor = config.blockingFactor;
        this.cache = myCache;
        this.instructionCount = 0;
    }
    
    runAlgorithm() {
        switch(this.algorithm) {
            case "mxm":
                programs.mxm(this);
                break;
            case "mxm_block":
                programs.mxm_block(this);
                break;
            case "daxpy":
                programs.daxpy(this);
                break;
            default:
                throw new Error(`Unknown algorithm "${this.algorithm}"`);
        }
        return 0;
    }

    loadDouble(address) {
        this.instructionCount ++;
        return this.cache.getDouble(new Address(address));
    }

    storeDouble(address, value) {
        this.instructionCount ++;
        this.cache.setDouble(new Address(address), value);
    }

    addDouble(value1, value2) {
        this.instructionCount ++;
        return value1 + value2;
    }

    multDouble(value1, value2) {
        this.instructionCount ++;
        return value1 * value2;
    }
}

module.exports = Cpu;