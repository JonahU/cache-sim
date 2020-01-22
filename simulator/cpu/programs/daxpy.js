const daxpy = myCpu => {
    for(let i=0; i<myCpu.algorithmDimension; i++) {
        myCpu.storeDouble(i, i);
        myCpu.storeDouble(myCpu.algorithmDimension+i, 2*i);
        myCpu.storeDouble(2*myCpu.algorithmDimension+i, 0);
    }
    const register0 = 3;
    for(let i=0; i<myCpu.algorithmDimension; i++) {
        const register1 = myCpu.loadDouble(i);
        const register2 = myCpu.multDouble(register0, register1);
        const register3 = myCpu.loadDouble(myCpu.algorithmDimension+i);
        const register4 = myCpu.addDouble(register2, register3);
        myCpu.storeDouble(2*myCpu.algorithmDimension+i, register4);
    }
};

module.exports = daxpy;