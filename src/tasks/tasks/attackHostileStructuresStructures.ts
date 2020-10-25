import _ from 'lodash'

let attackHostileStructures = {
    id: 'attackHostileStructures',
    do: _do
}

export default attackHostileStructures

/** @param {Creep} creep **/
function _do(creep: Creep) {
    let hostileStructure = creep.pos.findClosestByPath<AnyStructure>(FIND_HOSTILE_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_SPAWN })
    console.log(creep, hostileStructure)
    if(!hostileStructure) {
        return false
    }

    if(Game.flags.Assault && Game.flags.Assault.room) {
        hostileStructure = _(Game.flags.Assault.pos.findInRange(FIND_STRUCTURES, 0)).filter((structure) => structure.structureType == STRUCTURE_WALL).head()
    }

    creep.attack(hostileStructure)
    const moveResult = creep.moveTo(hostileStructure)
    return !(moveResult == ERR_NO_PATH)
}
