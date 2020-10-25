import taskAssaultRoom from './task.assaultRoom'
import tasksRunner from './tasks.runner'
import taskRangedAttack from './task.attackRanged'

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
