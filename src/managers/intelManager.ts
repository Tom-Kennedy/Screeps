import creepHelper from 'old/helper.creep'
import _ from "lodash";

let intelManager = {
    manage: _manage,
    mapCreeps: _mapCreeps
};

export default intelManager

/** @param {Room} room **/
function _manage(room: Room) {
    room.memory.lastSeenTick = Game.time
    room.memory.name = room.name
    _recordControllerInfo(room)
    _recordStorageInfo(room)
    _recordSources(room)
    _recordCreeps(room)
    _recordStructures(room)
    if(room.controller && room.controller.my) {
        _recordSpawnInfo(room)
    }
}

/** @param {Room} room **/
// TODO: not finished
function _recordStructures(room:Room) {
    room.memory.towerEnergy = _(room.find<StructureTower>(FIND_HOSTILE_STRUCTURES))
            .filter((structure) => structure.structureType == STRUCTURE_TOWER)
            .sum((tower) => tower.store.getUsedCapacity(RESOURCE_ENERGY))
}

function _recordCreeps(room:Room) {
    room.memory.creepInfo = {
        hostile : _mapCreeps(room.find(FIND_HOSTILE_CREEPS)),
        my: _mapCreeps(room.find(FIND_MY_CREEPS))
    }
}

// TODO: this can actually be even better
function _mapCreeps(creeps:Creep[]) {
    let creepInfo = creeps.map(_mapCreep)
    let fighters = creepInfo.filter((creep) => creep.isFighter)
    let workers = creepInfo.filter((creep) => !creep.isFighter)

    let fighterCost = _.sum(fighters.map((creep) => creep.cost))
    let workerCost = _.sum(workers.map((creep) => creep.cost))
    let totalCost = fighterCost + workerCost

    return {
        workerInfo : {
            cost: workerCost,
            creeps: workers
        },
        fighterInfo: {
            cost: fighterCost,
            creeps: fighters,
            attackParts: _.sum(fighters.map((creep) => creep.attackParts)),
            rangedParts: _.sum(fighters.map((creep) => creep.rangedParts)),
            healerParts: _.sum(fighters.map((creep) => creep.healerParts))
        },
        totalCost: totalCost
    }
}

function _mapCreep(creep: Creep) {
    let attackParts = creep.getActiveBodyparts(ATTACK)
    let rangedParts = creep.getActiveBodyparts(RANGED_ATTACK)
    let healerParts = creep.getActiveBodyparts(HEAL)

    return {
        pos: creep.pos,
        body: creep.body,
        hits: creep.hits,
        hitsMax: creep.hitsMax,
        id: creep.id,
        my: creep.my,
        name: creep.name,
        username: creep.owner ? creep.owner.username : null,
        ticksToLive: creep.ticksToLive,
        cost: creepHelper.getCost(creep),
        attackParts: attackParts,
        rangedParts: rangedParts,
        healerParts: healerParts,
        isFighter: _isFighter(creep, attackParts, rangedParts, healerParts)
    }
}

function _isFighter(creep:Creep, attackParts: number, rangedParts: number, healerParts: number) {
    if(creep.my) {
        return creep.memory.isFighter
    }
    return  (attackParts || rangedParts || healerParts) > 0
}

function _recordSources(room: Room) {
    room.memory.sources = room.find(FIND_SOURCES).map((source) => {
        return {
            pos: source.pos,
            id: source.id
        }
    })
}

// TODO: I might do this differently in the future. Currently used method ownly works for bases I own
// and I already have access to that information without using memory
function _recordSpawnInfo(room: Room) {
    room.memory.spawnInfo = {
        energyAvailable: room.energyAvailable,
        energyCapacityAvailable: room.energyCapacityAvailable,
    }
}

function _recordControllerInfo(room: Room) {
    if(!room.controller)
        return

    let controller = room.controller
    room.memory.controllerInfo = {
        pos: controller.pos,
        my: controller.my,
        username: controller.owner ? controller.owner.username : undefined,
        level: controller.level,
        progress: controller.progress,
        progressTotal: controller.progressTotal,
        progressPercentage: (controller.progress / controller.progressTotal).toFixed(2),
        reservation: controller.reservation,
        safeMode: controller.safeMode,
        safeModeAvailable: controller.safeModeAvailable,
        safeModeCooldown: controller.safeModeCooldown,
        ticksToDowngrade: controller.ticksToDowngrade,
        upgradeBlocked: controller.upgradeBlocked
    }
}

function _recordStorageInfo(room: Room) {
    let allContainers = room.find<StructureContainer|StructureStorage>(
        FIND_STRUCTURES,
        { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE })
    if(allContainers.length == 0) {
        return
    }
    let capacity =  _.sum(allContainers.map((structure) => structure.store.getCapacity(RESOURCE_ENERGY)))
    let usedCapacity =  _.sum(allContainers.map((structure) => structure.store.getUsedCapacity(RESOURCE_ENERGY)))
    let usedPercentage = (usedCapacity / capacity).toFixed(2)
    room.memory.storageInfo = {
        capacity: capacity,
        usedCapacity: usedCapacity,
        usedPercentage: usedPercentage
    }

    console.log(room, capacity, usedCapacity, usedPercentage)
}
