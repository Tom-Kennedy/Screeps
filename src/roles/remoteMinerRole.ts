import taskGoTo from '../tasks/task.goToFlag'
import taskMine from '../tasks/task.mine'
import taskStore from '../tasks/task.store'
import tasksRunner from '../tasks/tasks.runner'

let remoteMinerRole = {
    id: 'remoteMiner',
    run: function(creep: Creep) {
        const retrieveFlag = creep.memory.goToRetrieveFlagName ? Game.flags[creep.memory.goToRetrieveFlagName] : undefined
        const storeFlag = Game.flags.Container;
        const taskPriority = [
            taskStore,
            taskGoTo.createTask(storeFlag, _shouldReturn()),
            taskGoTo.createTask(retrieveFlag, _shouldRetrieve(retrieveFlag)),
            taskMine
        ]

        return tasksRunner.run(creep, taskPriority)
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
