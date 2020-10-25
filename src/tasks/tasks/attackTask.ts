let attackTask = {
    id: 'attack',
    do: function(creep: Creep) {
        const closestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: (c) => c.getActiveBodyparts(RANGED_ATTACK) })
            || creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

        if(!closestHostile)
            return false

        const attackerNeighbors = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1)
            .filter((creep) => creep.getActiveBodyparts(ATTACK))
        if(attackerNeighbors.length) {
            creep.attack(attackerNeighbors[0])
            return true
        }

        creep.attack(closestHostile)
        if(creep.pos.getRangeTo(closestHostile) > 1) {
            creep.moveTo(closestHostile)
        }
        return true
    }
};

export default attackTask
