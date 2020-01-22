const Address = require("../address");
const programs = require("./programs");

class Cpu {
    constructor(config, myCache) {
        this.algorithm = config.algorithm;
        this.algorithmDimension = config.dimension;
        this.cache = myCache;
    }
    
    runAlgorithm() {
        switch(this.algorithm) {
            case "mxm":
                break;
            case "mxm_block":
                break;
            case "daxpy":
                programs.daxpy(this);
                break;
        }
    }

    loadDouble(address) {
        return this.cache.getDouble(new Address(address));
    }

    storeDouble(address, value) {
        this.cache.setDouble(new Address(address), value);
    }

    addDouble(value1, value2) {
        return value1 + value2;
    }

    multDouble(value1, value2) {
        return value1 * value2;
    }
}

module.exports = Cpu;