import roomManager from 'managers/manager.room'
import creepManager from 'managers/manager.creep'
import attackManager from 'managers/manager.attack'
import remoteMiningManager from 'managers/manager.remoteMining'

const main = function () {
    creepManager.run()
    roomManager.run()
    remoteMiningManager.run()
    attackManager.run()
}

export default main
