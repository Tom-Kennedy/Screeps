import goToFlagTask from '../tasks/tasks/goToFlagTask'
import taskRunner from '../tasks/taskRunner'
import attackHostileStructures from '../tasks/tasks/attackHostileStructuresStructures'

let baseBusterRole = {
    id: 'scout',
    run: function(creep:Creep) {
        const taskPriority = [
            attackHostileStructures,
            // @ts-ignore
            goToFlagTask.createTask(Game.flags[creep.memory.scoutFlag], () => !creep.room.find(FIND_HOSTILE_CREEPS).length)
        ]

        return taskRunner.run(creep, taskPriority)
    }
}

export default baseBusterRole
