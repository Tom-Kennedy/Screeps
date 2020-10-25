import _ from 'lodash'

let maintainDefencesTask = {
    id: 'maintainDefences',
    do: _do
}

export default maintainDefencesTask

function _do(creep: Creep) {
    let target:any = creep.memory.targetId ? Game.getObjectById(creep.memory.targetId) : undefined
    if(!creep.store.getUsedCapacity()) {
        creep.memory.targetId = undefined
        return false
    }

    if(target && target.hits == target.hitsMax) {
        return false
    }

    if(!target) {
        const constructionTargets = getConstructionTargets(creep);
        const repairTargets = getRepairTargets(creep);
        target = _.head(constructionTargets.filter((site) => site.structureType == STRUCTURE_TOWER))
        target = target || _.head(repairTargets.filter((structure) => structure.structureType == STRUCTURE_TOWER))
        target = target || _.head(constructionTargets.filter((site) => site.structureType == STRUCTURE_RAMPART))
        target = target || _.head(constructionTargets.filter((site) => site.structureType == STRUCTURE_WALL))
        target = target || getWeakestWall(repairTargets)

        // console.log(creep, target)

        if(!target) {
            return false
        }
        creep.memory.targetId = target.id
    }

    const repairResult = creep.repair(target);
    const buildResult = creep.build(target);

    // console.log(creep, 'repair', repairResult)
    // console.log(creep, 'build', buildResult)
    if(buildResult == ERR_NOT_IN_RANGE || repairResult == ERR_NOT_IN_RANGE) {
        const moveResult = creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" }});
        return moveResult == OK || moveResult != ERR_TIRED
    }

    return repairResult == OK || buildResult == OK
}

function getWeakestWall(repairTargets: AnyStructure[]) {
    return repairTargets.length ? repairTargets.reduce((a, b) => a.hits < b.hits ? a : b) : null
}

function getConstructionTargets(creep: Creep) {
    return creep.room.find(
                FIND_MY_CONSTRUCTION_SITES,
                { filter: (constructionSite) =>
                    constructionSite.structureType == STRUCTURE_TOWER ||
                    constructionSite.structureType == STRUCTURE_RAMPART ||
                    constructionSite.structureType == STRUCTURE_WALL
                })
}

function getRepairTargets(creep: Creep) {
    if(!creep.room.controller)
        return []
    const wallMaxHits = RAMPART_HITS_MAX[creep.room.controller.level]
    return creep.room.find(
            FIND_STRUCTURES,
            { filter: (structure) =>
                ((structure.structureType == STRUCTURE_TOWER && structure.hits < structure.hitsMax) ||
                (structure.structureType == STRUCTURE_RAMPART && structure.hits < Math.min(wallMaxHits, structure.hitsMax) * .9) ||
                (structure.structureType == STRUCTURE_WALL && structure.hits < Math.min(wallMaxHits, structure.hitsMax) * .9))
            })
}
