import taskRunner from '../tasks/taskRunner'
import retrieveTask from '../tasks/tasks/retrieveTask'
import mineTask  from '../tasks/tasks/mineTask'
import supplyTask from '../tasks/tasks/supplyTask'
import buildTask from '../tasks/tasks/buildTask'
import upgradeTask from '../tasks/tasks/upgradeTask'
import repairTask from '../tasks/tasks/repairTask'
import maintainDefensesTask from '../tasks/tasks/maintainDefensesTask'

const taskList = [
    supplyTask,
    buildTask,
    repairTask,
    maintainDefensesTask,
    upgradeTask,
    retrieveTask,
    mineTask
]

let workerRole = {
    id: 'worker',
    run: function (creep: Creep) {
        return taskRunner.run(creep, taskList)
    }
}

export default workerRole
