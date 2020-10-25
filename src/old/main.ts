import roomManager from 'managers/roomManager'
import creepManager from 'managers/creepManager'
import attackManager from 'managers/attackManager'
import remoteMiningManager from 'managers/remoteMiningManager'

const main = function () {
    creepManager.run()
    roomManager.run()
    remoteMiningManager.run()
    attackManager.run()
}

export default main
