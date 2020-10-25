import taskRunner from '../tasks/taskRunner'
import retrieveTask from '../tasks/tasks/retrieveTask'
import mineTask  from '../tasks/tasks/mineTask'
import taskSupply from '../tasks/tasks/supplyTask'
import taskBuild from '../tasks/tasks/buildTask'
import upgradeTask from '../tasks/tasks/upgradeTask'
import taskRepair from '../tasks/tasks/repairTask'
import maintainDefences from '../tasks/tasks/maintainDefencesTask'

const taskList = [
    taskSupply,
    taskBuild,
    taskRepair,
    maintainDefences,
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
