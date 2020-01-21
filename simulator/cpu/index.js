const Address = require("../address");

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
                this.daxpy();
                break;
        }
    }

    daxpy() {
        for(let i=0; i<this.algorithmDimension; i++) {
            const j = i*SIZEOF_DOUBLE;
            this.storeDouble(j, i);
            this.storeDouble(2*this.algorithmDimension+j, 2*i);
            this.storeDouble(3*this.algorithmDimension+j, 0);
        }
        // const register0 = 3;
        // for(let i=0; i<this.algorithmDimension; i++) {
        //     const j = i*SIZEOF_DOUBLE;
        //     const register1 = myCpu.loadDouble(j)
        //     const register2 = myCpu.multDouble(register0, register1)
        //     const register3 = myCpu.loadDouble(j*2)
        //     const register4 = myCpu.addDouble(register2, register3)
        //     myCpu.storeDouble(j*3, register4) 
        // }
    }

    loadDouble(address) {

    }

    storeDouble(address, value) {
        this.cache.setDouble(address, value);
    }

    addDouble(value1, value2) {

    }

    multDouble(value1, value2) {

    }
}

module.exports = Cpu;