import mineTask from '../tasks/tasks/mineTask'
import retrieveTask from '../tasks/tasks/retrieveTask'
import upgradeTask from '../tasks/tasks/upgradeTask'
import taskRunner from '../tasks/taskRunner'

let upgraderRole = {
    id: 'upgrader',
    run: function(creep: Creep) {
        return taskRunner.run(creep, taskPriority)
    }
}

export default upgraderRole

const taskPriority = [
    retrieveTask,
    upgradeTask,
    mineTask
]
