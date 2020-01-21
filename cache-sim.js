const argv = require("./argv");
const simulator = require("./simulator");

global.SIZEOF_DOUBLE = 8;
global.SIZEOF_ADDRESS = 64;

const config = argv();
console.log("======INPUTS======");
console.log(config);

simulator.start(config);