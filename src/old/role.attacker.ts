import tasksRunner from './tasks.runner'
import taskAttack from './task.attack'
import taskAssaultRoom from './task.assaultRoom'

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
