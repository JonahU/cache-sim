const argv = require("./argv");
const simulator = require("./simulator");

global.SIZEOF_DOUBLE = 8;
global.SIZEOF_ADDRESS = 64;


const config = argv();
console.log("======INPUTS======");
console.log(config);

const cache_sim = simulator(config);
const results = cache_sim.start();
console.log("======RESULTS======");
console.log(results);

if(config.printSolution) {
    cache_sim.printSolution()
}
