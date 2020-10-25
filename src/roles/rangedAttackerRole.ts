import assaultRoomTask from '../tasks/tasks/assaultRoomTask'
import taskRunner from '../tasks/taskRunner'
import taskRangedAttack from '../tasks/tasks/attackRangedTask'

let rangedAttackerRole = {
    id: 'rangedAttacker',
    run: function(creep: Creep) {
        const taskPriority = [
            taskRangedAttack,
            assaultRoomTask
        ];
        return taskRunner.run(creep, taskPriority)
    }
};

export default rangedAttackerRole
