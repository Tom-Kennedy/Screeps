import _ from "lodash";

const creepHelper = {
    maintainArea: _maintainArea,
    moveTo: _moveTo,
    getCost : _getCost
};

export default creepHelper

function _maintainArea(creep: Creep) {
    _workArea(creep)
    return _cleanArea(creep)
}

function _cleanArea(creep: Creep) {
    if(!creep.store.getFreeCapacity())
        return

    let closeResource = _.head(creep.pos.findInRange(FIND_DROPPED_RESOURCES, 5))
    if(closeResource) {
        creep.pickup(closeResource)
        creep.moveTo(closeResource)
    }

    let closeTombstone = _.head(creep.pos.findInRange(FIND_TOMBSTONES, 5))
    if(closeTombstone) {

    }
}

function _workArea(creep: Creep) {
    if(!creep.getActiveBodyparts(WORK))
        return

    let buildSite = _.head(creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 0));
    if(buildSite) {
          creep.build(buildSite)
          return
      }

    let damagedStructure = _.head(creep.pos.findInRange(FIND_STRUCTURES, 0, { filter: (s) => s.hits < s.hitsMax })) ||
        _.head(creep.pos.findInRange(FIND_STRUCTURES, 1, { filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax }));
    // console.log(damagedStructure)
    if(damagedStructure) {
        creep.repair(damagedStructure)
        return
    }
}

function _moveTo(creep:Creep, target: RoomPosition | { pos: RoomPosition }, stroke?: string) {
    return creep.moveTo(target, {visualizePathStyle: {stroke: stroke}});
}

function _getCost(creep: Creep) {
    return _.sum(creep.body.map((b) => BODYPART_COST[b.type]))
}
