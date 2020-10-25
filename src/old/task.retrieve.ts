let _id = 'retrieve'
let taskRetrieve = {
    id: _id,
    do: function(creep:Creep) {
        if(creep.store.getFreeCapacity() == 0)
            return false

        const closestStorage = findContainer(creep)
        if(!closestStorage)
            return false

        if(!creep.pos.inRangeTo(closestStorage, 1) && creep.moveTo(closestStorage) != ERR_NO_PATH)
            return true

        creep.withdraw(closestStorage, RESOURCE_ENERGY)

        return creep.store.getFreeCapacity() != 0;
    }
}

export default taskRetrieve

function findContainer(creep:Creep) {
    return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getUsedCapacity(RESOURCE_ENERGY);
            }
    });
}
