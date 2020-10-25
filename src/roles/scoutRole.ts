import taskGoToFlag from '../tasks/task.goToFlag'
import tasksRunner from '../tasks/tasks.runner'
import taskAttack from '../tasks/task.attack'
import attackHostileStructures from '../tasks/task.attackHostileStructures'

let scoutRole = {
    id: 'scout',
    run: function(creep: Creep) {
        const taskPriority = [
            taskAttack,
            attackHostileStructures
        ]

        if(creep.memory.scoutFlag) {
            taskPriority.push(
                taskGoToFlag.createTask(Game.flags[creep.memory.scoutFlag], () => !creep.room.find(FIND_HOSTILE_CREEPS).length))
        }

        return tasksRunner.run(creep, taskPriority)
    }
};

export default scoutRole
