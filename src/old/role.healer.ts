import tasksRunner from './tasks.runner'
import taskHeal from './task.heal'
import taskAssaultRoom from './task.assaultRoom'

let roleHealer = {
    id: 'healer',
    run: function(creep: Creep) {
        const taskPriority = [
            taskHeal,
            taskAssaultRoom
        ];
        return tasksRunner.run(creep, taskPriority)
    }
}

export default roleHealer
