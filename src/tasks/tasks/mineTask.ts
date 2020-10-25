import creepHelper from 'old/helper.creep'
import _ from 'lodash'

let mineTask = {
    id: 'mine',
    do : function(creep: Creep) {
        if(creep.store.getFreeCapacity() == 0)
            return false

        const source = creep.memory.targetId ? Game.getObjectById<Source>(creep.memory.targetId) : creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if(!source || source.energy == 0) {
            creep.memory.targetId = undefined
            return false
        }

        creep.memory.targetId = source.id

        const harvestResult = creep.harvest(source)
        // console.log(creep, harvestResult)
        if(harvestResult == ERR_NOT_IN_RANGE) {
            const moveResult = creepHelper.moveTo(creep, source, "#ffaa00")
            return moveResult == OK || moveResult == ERR_TIRED
        }

        const container = _.head(creep.pos.findInRange<StructureContainer>(
            FIND_STRUCTURES,
            1,
            { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) }));
        // console.log(container)
        if(container && creep.store.getUsedCapacity() > creep.store.getCapacity() * 0.5){
            creep.transfer(container, RESOURCE_ENERGY)
        }

        if(harvestResult == OK) {
            const harvestedAmount = creep.getActiveBodyparts(WORK) * 2;
            creep.memory.harvested = creep.memory.harvested ? creep.memory.harvested + harvestedAmount : harvestedAmount
        }

        return true
    }
}

export default mineTask
