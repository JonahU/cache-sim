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
            const solutionAddress = 2*Math.pow(dimension,2) + i*dimension+j;
            let register1 = myCpu.loadDouble(solutionAddress);
            for(let k = 0; k<dimension; k++) {
                const register2 = myCpu.loadDouble(i*dimension+k);
                const register3 = myCpu.loadDouble(Math.pow(dimension,2)+k*dimension+j);
                const register4 = myCpu.multDouble(register2, register3);
                register1 = myCpu.addDouble(register4, register1);
            }
            myCpu.storeDouble(solutionAddress, register1);
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