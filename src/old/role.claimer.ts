import taskClaim from './task.claim'
import tasksRunner from './tasks.runner'

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
