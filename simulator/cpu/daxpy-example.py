# Initialize a Cpu object with whatever args you need
myCpu = Cpu(**kwargs)
# Assume 8 bytes per Double
sz = 8
# Construct arrays of Addresses for length = 100 problem
n = 100
a = list(range(0, n*sz, sz))
b = list(range(n*sz, 2*n*sz, sz))
c = list(range(2*n*sz, 3*n*sz, sz))
# Initialize some dummy values
for i in range(n):
    myCpu.storeDouble(address=a[i], value=i)
    myCpu.storeDouble(address=b[i], value=2*i)
    myCpu.storeDouble(address=c[i], value=0)
# Put a random 'D' value into a register
register0 = 3
# Run the daxpy. Registers are just local variables.
for in in range(n):
    register1 = myCpu.loadDouble(a[i])
    register2 = myCpu.multDouble(register0, register1)
    register3 = myCpu.loadDouble(b[i])
    register4 = myCpu.addDouble(register2, register3)
    myCpu.storeDouble(c[i], register4)