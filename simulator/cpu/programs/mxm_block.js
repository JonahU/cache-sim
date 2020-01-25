const mxm_block = myCpu => {
    const { algorithmDimension: dimension, blockingFactor } = myCpu;
    for(let i = 0; i<dimension; i++) {
        for(let j = 0; j<dimension; j++) {
            const val = i*dimension+j;
            myCpu.storeDouble(val, val);
            myCpu.storeDouble(Math.pow(dimension,2)+val, 2*val);
            myCpu.storeDouble(2*Math.pow(dimension,2)+val, 0);
        }
    }

    for(let ii=0; ii<dimension; ii+=blockingFactor) {
        for(let jj=0; jj<dimension; jj+=blockingFactor) {
            for(let kk=0; kk<dimension; kk+=blockingFactor) {
                for(let i=ii; i<Math.min(ii+blockingFactor, dimension); i++) {
                    for(let j=jj;j<Math.min(jj+blockingFactor, dimension); j++) {
                        for(let k=ii; k<Math.min(kk+blockingFactor, dimension); k++) {
                            const register0 = myCpu.loadDouble(i*dimension+k);
                            const register1 = myCpu.loadDouble(Math.pow(dimension,2)+k*dimension+j);
                            const register2 = myCpu.multDouble(register0, register1);
            
                            const solutionAddress = 2*Math.pow(dimension,2) + i*dimension+j;
                            const register3 = myCpu.loadDouble(solutionAddress);
                            const register4 = myCpu.addDouble(register2, register3);
                            myCpu.storeDouble(solutionAddress, register4);
                        }
                    }
                }
            }
        }
    }
};

module.exports = mxm_block;