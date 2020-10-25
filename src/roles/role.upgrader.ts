import taskMine from '../tasks/task.mine'
import taskRetrieve from '../tasks/task.retrieve'
import taskUpgrade from '../tasks/task.upgrade'
import tasksRunner from '../tasks/tasks.runner'

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
