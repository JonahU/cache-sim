const Address = require("../address");
const programs = require("./programs");

class Cpu {
    constructor(config, myCache, myRam) {
        this.algorithm = config.algorithm;
        this.algorithmDimension = config.dimension;
        this.blockingFactor = config.blockingFactor;
        this.cache = myCache;
        this.ram = myRam;
        this.instructionCount = 0;
    }
    
    runAlgorithm() {
        switch(this.algorithm) {
            case "mxm":
                programs.mxm.run(this);
                break;
            case "mxm_block":
                programs.mxm_block.run(this);
                break;
            case "daxpy":
                programs.daxpy.run(this);
                break;
            default:
                throw new Error(`Unknown algorithm "${this.algorithm}"`);
        }
        return 0;
    }

    printSolution() {
        switch(this.algorithm) {
            case "mxm":
                programs.mxm.printSolution(this);
                break;
            case "mxm_block":
                programs.mxm_block.printSolution(this);
                break;
            case "daxpy":
                programs.daxpy.printSolution(this);
                break;
            default:
                throw new Error(`Unknown algorithm "${this.algorithm}"`);
        }
    }

    loadDouble(address) {
        this.instructionCount ++;
        return this.cache.getDouble(new Address(address));
    }

    storeDouble(address, value) {
        this.instructionCount ++;
        const newAddress = new Address(address);
        // console.log("SETTING " + value + " at " + address);
        this.cache.setDouble(newAddress, value);
        // console.log(this.cache.getContents())
        this.ram.setDouble(newAddress, value);
        // console.log(this.ram.data);
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