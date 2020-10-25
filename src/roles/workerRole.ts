import tasksRunner from '../tasks/tasks.runner'
import taskRetrieve from '../tasks/task.retrieve'
import taskMine  from '../tasks/task.mine'
import taskSupply from '../tasks/task.supply'
import taskBuild from '../tasks/task.build'
import taskUpgrade from '../tasks/task.upgrade'
import taskRepair from '../tasks/task.repair'
import maintainDefences from '../tasks/task.maintainDefences'

const taskList = [
    taskSupply,
    taskBuild,
    taskRepair,
    maintainDefences,
    taskUpgrade,
    taskRetrieve,
    taskMine
]

let workerRole = {
    id: 'worker',
    run: function (creep: Creep) {
        return tasksRunner.run(creep, taskList)
    }
}

export default workerRole
