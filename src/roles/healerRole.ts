import taskRunner from '../tasks/taskRunner'
import healTask from '../tasks/tasks/healTask'
import assaultRoomTask from '../tasks/tasks/assaultRoomTask'

let healerRole = {
    id: 'healer',
    run: function(creep: Creep) {
        const taskPriority = [
            healTask,
            assaultRoomTask
        ];
        return taskRunner.run(creep, taskPriority)
    }
}

export default healerRole
