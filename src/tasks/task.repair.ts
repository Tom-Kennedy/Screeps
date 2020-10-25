import _ from 'lodash'

let _ignoredStructures: StructureConstant[] = [
    STRUCTURE_WALL,
    STRUCTURE_RAMPART
]

let repairTask = {
    id: 'repair',
    do: function(creep: Creep) {
        if(creep.store.getUsedCapacity() == 0)
            return false

        const closestDamagedStructure =
            _.head(creep.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: (structure) =>
                    !_ignoredStructures.includes(structure.structureType) && structure.hits < structure.hitsMax
            })) ||
            creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>
                    !_ignoredStructures.includes(structure.structureType) && structure.hits < structure.hitsMax * .5
            });

        if(!closestDamagedStructure) {
            return false
        }

        if(!creep.pos.inRangeTo(closestDamagedStructure, 3) && creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffffff'}}) != ERR_NO_PATH)
            return true

        return creep.repair(closestDamagedStructure) == OK;
    }
};

export default repairTask;
