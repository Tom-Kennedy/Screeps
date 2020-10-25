import { ErrorMapper } from "utils/ErrorMapper"
import roomManager from 'managers/roomManager'
import creepManager from 'managers/creepManager'
import attackManager from 'managers/attackManager'
import remoteMiningManager from 'managers/remoteMiningManager'

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    creepManager.run()
    roomManager.run()
    remoteMiningManager.run()
    attackManager.run()
});
