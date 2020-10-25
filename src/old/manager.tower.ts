import _ from "lodash";

let towerManager = {
    run: function (room: Room) {
        // attack
        let hostiles = room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            let username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${room.name}`);
            let towers = room.find<StructureTower>(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
        }

        // repair
        let closestDamagedStructure = _(room.find(FIND_STRUCTURES, {
            filter: (structure) =>
                    structure.hits < structure.hitsMax * 0.05 &&
                    structure.hits < 50000
        })).head()

        if(closestDamagedStructure) {
            let towers = room.find<StructureTower>(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.repair(closestDamagedStructure));
        }
    }
};

export default towerManager
