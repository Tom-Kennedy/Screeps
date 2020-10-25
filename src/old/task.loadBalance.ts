import creepHelper from './helper.creep'

let loadBalanceTask = {
    id: 'loadBalance',
    do: function(creep: Creep) {
        let closestStorage:any = creep.memory.targetId ? Game.getObjectById(creep.memory.targetId) : undefined;
        if(creep.store.getUsedCapacity() == 0)
            return false

        closestStorage =  closestStorage || findStoreTarget(creep)
        if(!closestStorage)
            return false

        creep.memory.targetId = closestStorage.id

        if(creep.transfer(closestStorage, RESOURCE_ENERGY) == OK)
            return true

        return creepHelper.moveTo(creep, closestStorage) != ERR_NO_PATH;
    }
}

export default loadBalanceTask

function findStoreTarget(creep: Creep) {
    const allStorage = creep.room.find<StructureStorage|StructureContainer>(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_STORAGE ||
                (structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY) * .4);
        }
    })

    if(allStorage.length == 0) {
        return null
    }

    // console.log(allStorage)
    return allStorage.reduce((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) < b.store.getUsedCapacity(RESOURCE_ENERGY) ? a : b)
}
