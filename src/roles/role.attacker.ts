import tasksRunner from '../tasks/tasks.runner'
import taskAttack from '../tasks/task.attack'
import taskAssaultRoom from '../tasks/task.assaultRoom'

let roleAttacker = {
    id: 'attacker',
    run: _run
}

export default roleAttacker

function _run(creep: Creep) {
    const taskPriority = [
        taskAttack,
        taskAssaultRoom
    ]
    return tasksRunner.run(creep, taskPriority)
}
