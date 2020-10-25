import taskMine from './task.mine'
import taskStore from './task.store'
import tasksRunner from './tasks.runner'
import taskSupply from './task.supply'
import taskBuild from './task.build'
import taskUpgrade from './task.upgrade'

const taskPriority = [
    taskStore,
    taskMine,
    taskSupply,
    taskBuild,
    taskUpgrade
];

let roleMiner = {
    id: 'miner',
    run: function(creep: Creep) {
        return tasksRunner.run(creep, taskPriority)
    }
}

export default roleMiner
