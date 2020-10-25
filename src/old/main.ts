import roomManager from './manager.room'
import creepManager from './manager.creep'
import attackManager from './manager.attack'
import remoteMiningManager from './manager.remoteMining'

const main = function () {
    creepManager.run()
    roomManager.run()
    remoteMiningManager.run()
    attackManager.run()
}

export default main
