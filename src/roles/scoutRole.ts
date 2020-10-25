import goToFlagTask from '../tasks/tasks/goToFlagTask'
import taskRunner from '../tasks/taskRunner'
import taskAttack from '../tasks/tasks/attackTask'
import attackHostileStructures from '../tasks/tasks/attackHostileStructuresStructures'

let scoutRole = {
    id: 'scout',
    run: function(creep: Creep) {
        const taskPriority = [
            taskAttack,
            attackHostileStructures
        ]

        if(creep.memory.scoutFlag) {
            taskPriority.push(
                goToFlagTask.createTask(Game.flags[creep.memory.scoutFlag], () => !creep.room.find(FIND_HOSTILE_CREEPS).length))
        }

        return taskRunner.run(creep, taskPriority)
    }
};

export default scoutRole
