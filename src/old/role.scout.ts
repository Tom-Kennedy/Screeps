import taskGoToFlag from './task.goToFlag'
import tasksRunner from './tasks.runner'
import taskAttack from './task.attack'
import attackHostileStructures from './task.attackHostileStructures'

let roleScout = {
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

export default roleScout
