import taskMine from './task.mine'
import taskRetrieve from './task.retrieve'
import taskUpgrade from './task.upgrade'
import tasksRunner from './tasks.runner'

let roleUpgrader = {
    id: 'upgrader',
    run: function(creep: Creep) {
        return tasksRunner.run(creep, taskPriority)
    }
}

export default roleUpgrader

const taskPriority = [
    taskRetrieve,
    taskUpgrade,
    taskMine
]
