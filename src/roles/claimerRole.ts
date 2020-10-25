import taskClaim from '../tasks/tasks/claimTask'
import taskRunner from '../tasks/taskRunner'

const taskPriority = [
    taskClaim
]

let claimerRole = {
    id: 'claimer',
    run: function(creep: Creep) {
        return taskRunner.run(creep, taskPriority)
    }
}

export default claimerRole
