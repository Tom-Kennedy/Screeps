let _id = 'retrieveExcess'
const taskRetrieveExcess = {
    id: _id,
    do: function(creep: Creep) {
        if(creep.store.getFreeCapacity() == 0)
            return false

        let closestStorage = creep.memory.targetId != undefined ? Game.getObjectById<StructureContainer>(creep.memory.targetId) : findContainer(creep)
        if(!closestStorage)
            return false

        creep.memory.targetId = closestStorage.id

        if(!creep.pos.inRangeTo(closestStorage, 1) && creep.moveTo(closestStorage) != ERR_NO_PATH)
            return true

        creep.withdraw(closestStorage, RESOURCE_ENERGY)

        return false
    }
}

export default taskRetrieveExcess

function findContainer(creep: Creep) {
    const allStorage = creep.room.find<StructureContainer>(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > structure.store.getCapacity() * .6
            }
    })

    if(allStorage.length == 0) {
        return null
    }

    return allStorage.reduce((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) > b.store.getUsedCapacity(RESOURCE_ENERGY) ? a : b)
}
