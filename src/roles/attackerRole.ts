import taskRunner from '../tasks/taskRunner'
import taskAttack from '../tasks/tasks/attackTask'
import assaultRoomTask from '../tasks/tasks/assaultRoomTask'

let attackerRole = {
    id: 'attacker',
    run: _run
}

export default attackerRole

function _run(creep: Creep) {
    const taskPriority = [
        taskAttack,
        assaultRoomTask
    ]
    return taskRunner.run(creep, taskPriority)
}
