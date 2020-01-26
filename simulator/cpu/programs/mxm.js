const run = myCpu => {
    const dimension = myCpu.algorithmDimension;
    for(let i = 0; i<dimension; i++) {
        for(let j = 0; j<dimension; j++) {
            const val = i*dimension+j;
            myCpu.storeDouble(val, val);
            myCpu.storeDouble(Math.pow(dimension,2)+val, 2*val);
            myCpu.storeDouble(2*Math.pow(dimension,2)+val, 0);
        }
    }
    for(let i = 0; i<dimension; i++) {
        for(let j = 0; j<dimension; j++) {
            for(let k = 0; k<dimension; k++) {
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
};

const printSolution = myCpu => {
    const dimension = myCpu.algorithmDimension;
    for(let i = 0; i<dimension; i++) {
        for(let j = 0; j<dimension; j++) {
            const val = i*dimension+j;
            const register1 = myCpu.loadDouble(2*Math.pow(dimension,2)+val);
            console.log(register1);
        }
    }
}

module.exports = { run, printSolution };