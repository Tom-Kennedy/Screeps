import taskGoToFlag from '../tasks/task.goToFlag'
import tasksRunner from '../tasks/tasks.runner'
import attackHostileStructures from '../tasks/task.attackHostileStructures'

let baseBusterRole = {
    id: 'scout',
    run: function(creep:Creep) {
        const taskPriority = [
            attackHostileStructures,
            // @ts-ignore
            taskGoToFlag.createTask(Game.flags[creep.memory.scoutFlag], () => !creep.room.find(FIND_HOSTILE_CREEPS).length)
        ]

        return tasksRunner.run(creep, taskPriority)
    }
}

export default baseBusterRole
