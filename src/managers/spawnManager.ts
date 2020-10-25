import workerRole from "../roles/workerRole"

let _spawn: any = undefined;
let _room:any = {};

function findCreepsOfRole(role:string) {
    return _room.find(FIND_MY_CREEPS, {
            filter : { memory : { role : role }}
    });
}

function spawnWorker(role: string) {
    const name = role + Game.time;
    const parts = workerRole.generateBody(_spawn.room.energyCapacityAvailable);
    const isSpawned = _spawn.spawnCreep(parts, name, { memory: { role: role, originRoom: _room.name } });
    if(isSpawned == OK) {
        console.log("Spawning" + name);
    }
}

function _setRoom(room:Room) {
    _room = room
    _spawn = room.find(FIND_MY_SPAWNS)[0]
}

const spawnManager = {
    spawning: () => _spawn.spawning,
    run: function(room: Room) {

        _setRoom(room)

        if(room.name == 'E45S9') {
            if(findCreepsOfRole('hauler').length < 1) {
                _spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], "Hauler" + Game.time, { memory:  {role : 'hauler'}})
            }
        } else {
            if(findCreepsOfRole('hauler').length < 1) {
                _spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Hauler" + Game.time, { memory:  {role : 'hauler'}})
            }
        }
    },

    spawnWorker: function(role:string) {
        spawnWorker(role);
    },

    spawnClaimer: function() {
        _spawn.spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE], "Claimer" + Game.time, { memory:  {role : 'claimer'}})
    }
}

export default spawnManager;
