const argv = require("./argv");
const simulator = require("./simulator");

const config = argv();
console.log("======INPUTS======");
console.log(config);

simulator.start(config);