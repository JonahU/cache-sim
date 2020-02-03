# Jonah Usadi
## MPCS 52010 - Winter 2020
## Project 1 - Cache Emulator

## How to run
1) `npm install`

2) `node cache-sim`

(NodeJS version tested on: v8.10.0)

## Misc
* Default configuration file: `config.json`
* Get a list of configurable options: `node cache-sim -h`
* Output progress information of a slow program: `DEBUG=progress-bar node cache-sim`

## Known issues
* The initial dummy addresses that populate the cache on startup are meaningless and confusing, and probably should be removed (see the else block in the Address class constructor)
* "valid bit" (isValid flag in the CacheSet class) is stored on the cache set object not the address
* Based off of other students' differing results I believe there may be a slight issue with the way my addresses are being calculated, however, I am not sure what that issue is