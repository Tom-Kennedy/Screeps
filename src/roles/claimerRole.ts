import taskClaim from '../tasks/task.claim'
import tasksRunner from '../tasks/tasks.runner'

const taskPriority = [
    taskClaim
]

let claimerRole = {
    id: 'claimer',
    run: function(creep: Creep) {
        return tasksRunner.run(creep, taskPriority)
    }
}

export default claimerRole
