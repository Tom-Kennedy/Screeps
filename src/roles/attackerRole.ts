import tasksRunner from '../tasks/tasks.runner'
import taskAttack from '../tasks/task.attack'
import taskAssaultRoom from '../tasks/task.assaultRoom'

let attackerRole = {
    id: 'attacker',
    run: _run
}

export default attackerRole

function _run(creep: Creep) {
    const taskPriority = [
        taskAttack,
        taskAssaultRoom
    ]
    return tasksRunner.run(creep, taskPriority)
}
