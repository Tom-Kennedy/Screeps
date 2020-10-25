let supplyTask = {
    id: 'supply',
    do: function(creep: Creep) {
        if(creep.store.getUsedCapacity() == 0) {
            creep.memory.targetId = undefined
            return false
        }

        let closestStorage =creep.memory.targetId != undefined ? Game.getObjectById<StructureExtension|StructureTower|StructureSpawn>(creep.memory.targetId)
            : findStoreTarget(creep)
        //console.log(creep, closestStorage, closestStorage.store, closestStorage.store.getFreeCapacity())
        if(!closestStorage || !closestStorage.store || closestStorage.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            // console.log(creep, 'f1')
            creep.memory.targetId = undefined
            return false
        }

        creep.memory.targetId = closestStorage.id

        if(creep.transfer(closestStorage, RESOURCE_ENERGY) == OK)
            return true

        return creep.moveTo(closestStorage, { visualizePathStyle: { stroke: '#00FF00' } }) != ERR_NO_PATH
    }
}

export default supplyTask

function findStoreTarget(creep:Creep) {
    return creep.pos.findClosestByPath<StructureExtension|StructureTower|StructureSpawn>(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
    });
}
