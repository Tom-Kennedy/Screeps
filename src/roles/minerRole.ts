import taskMine from '../tasks/task.mine'
import taskStore from '../tasks/task.store'
import tasksRunner from '../tasks/tasks.runner'
import taskSupply from '../tasks/task.supply'
import taskBuild from '../tasks/task.build'
import taskUpgrade from '../tasks/task.upgrade'

const taskPriority = [
    taskStore,
    taskMine,
    taskSupply,
    taskBuild,
    taskUpgrade
];

let minerRole = {
    id: 'miner',
    run: function(creep: Creep) {
        return tasksRunner.run(creep, taskPriority)
    }
}

export default minerRole
