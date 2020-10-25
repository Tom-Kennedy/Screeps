import tasksRunner from './tasks.runner'
import taskRetrieve from './task.retrieve'
import taskMine  from './task.mine'
import taskSupply from './task.supply'
import taskBuild from './task.build'
import taskUpgrade from './task.upgrade'
import taskRepair from './task.repair'
import maintainDefences from './task.maintainDefences'

const taskList = [
    taskSupply,
    taskBuild,
    taskRepair,
    maintainDefences,
    taskUpgrade,
    taskRetrieve,
    taskMine
]

let roleWorker = {
    id: 'worker',
    run: function (creep: Creep) {
        return tasksRunner.run(creep, taskList)
    }
}

export default roleWorker
