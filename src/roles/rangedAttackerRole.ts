import taskAssaultRoom from '../tasks/task.assaultRoom'
import tasksRunner from '../tasks/tasks.runner'
import taskRangedAttack from '../tasks/task.attackRanged'

let rangedAttackerRole = {
    id: 'rangedAttacker',
    run: function(creep: Creep) {
        const taskPriority = [
            taskRangedAttack,
            taskAssaultRoom
        ];
        return tasksRunner.run(creep, taskPriority)
    }
};

export default rangedAttackerRole
