import taskGoTo from '../tasks/tasks/goToFlagTask'
import mineTask from '../tasks/tasks/mineTask'
import storeTask from '../tasks/tasks/storeTask'
import taskRunner from '../tasks/taskRunner'

let remoteMinerRole = {
    id: 'remoteMiner',
    run: function(creep: Creep) {
        const retrieveFlag = creep.memory.goToRetrieveFlagName ? Game.flags[creep.memory.goToRetrieveFlagName] : undefined
        const storeFlag = Game.flags.Container;
        const taskPriority = [
            storeTask,
            taskGoTo.createTask(storeFlag, _shouldReturn()),
            taskGoTo.createTask(retrieveFlag, _shouldRetrieve(retrieveFlag)),
            mineTask
        ]

        return taskRunner.run(creep, taskPriority)
    }
};

function _shouldRetrieve(flag?:Flag) {
    // @ts-ignore
    const roomMemory = Memory.rooms[flag.pos.roomName];
    return (creep: Creep) => creep.store.getUsedCapacity() < creep.store.getCapacity() * .75 && !roomMemory.creepInfo.hostile.fighterInfo.creeps.length
}

function _shouldReturn() {
    return (creep:Creep) => creep.store.getUsedCapacity() > creep.store.getCapacity() * .75
}

export default remoteMinerRole
