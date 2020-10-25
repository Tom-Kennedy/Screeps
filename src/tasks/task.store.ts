import creepHelper from 'old/helper.creep'

let taskStore = {
    id: 'store',
    do: function(creep: Creep) {
        if(creep.store.getUsedCapacity() == 0)
            return false

        const closestStorage = findStoreTarget(creep);
        if(!closestStorage)
            return false

        if(creep.transfer(closestStorage, RESOURCE_ENERGY) == OK)
            return true

        return creepHelper.moveTo(creep, closestStorage) != ERR_NO_PATH
    }
}

export default taskStore

function findStoreTarget(creep:Creep) {
    return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity() > 0
            }
    })
}
