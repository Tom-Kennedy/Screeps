import mineTask from '../tasks/tasks/mineTask'
import storeTask from '../tasks/tasks/storeTask'
import taskRunner from '../tasks/taskRunner'
import taskSupply from '../tasks/tasks/supplyTask'
import taskBuild from '../tasks/tasks/buildTask'
import upgradeTask from '../tasks/tasks/upgradeTask'

const taskPriority = [
    storeTask,
    mineTask,
    taskSupply,
    taskBuild,
    upgradeTask
];

let minerRole = {
    id: 'miner',
    run: function(creep: Creep) {
        return taskRunner.run(creep, taskPriority)
    }
}

export default minerRole
