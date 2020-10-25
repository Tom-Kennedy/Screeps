import tasksRunner from '../tasks/tasks.runner'
import taskHeal from '../tasks/task.heal'
import taskAssaultRoom from '../tasks/task.assaultRoom'

let healerRole = {
    id: 'healer',
    run: function(creep: Creep) {
        const taskPriority = [
            taskHeal,
            taskAssaultRoom
        ];
        return tasksRunner.run(creep, taskPriority)
    }
}

export default healerRole
