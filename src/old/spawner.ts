import bodyBuilder from './builder.body'

let _spawn: any = undefined;
let _room:any = {};
const workerMap:any = {};

function generateWorkerBody(capacity: number) {
    let i;
    capacity = Math.floor(capacity/50) * 50
    console.log(capacity)
    if(workerMap.hasOwnProperty(capacity)) {
        return workerMap[capacity];
    }

    const totalWorkerParts = capacity / 50;
    const workBodies = Math.floor(totalWorkerParts / 4);
    const moveBodies = workBodies;
    const carryBodies = totalWorkerParts - Math.floor(workBodies * 2) - moveBodies;
    const body = [];
    for(i = 0; i < Math.min(workBodies, 6); i++) {
        body.push(WORK)
    }

    for(i = 0; i < Math.min(moveBodies, 6); i++) {
        body.push(MOVE)
    }

    for(i = 0; i < Math.min(carryBodies, 6); i++) {
        body.push(CARRY)
    }

    return workerMap[capacity] = body
}

function findCreepsOfRole(role:string) {
    return _room.find(FIND_MY_CREEPS, {
            filter : { memory : { role : role }}
    });
}

function spawnWorker(role: string) {
    const name = role + Memory.creepId;
    // TODO: Need to fix this too
    const parts = generateWorkerBody(_spawn.room.energyCapacityAvailable);
    const isSpawned = _spawn.spawnCreep(parts, name, { memory: { role: role, originRoom: _room.name } });
    if(isSpawned == OK) {
        console.log("Spawning" + name);
        Memory.creepId++;
    }
    if(isSpawned == ERR_NAME_EXISTS) {
        Memory.creepId++;
    }
}

function _setRoom(room:Room) {
    _room = room
    _spawn = room.find(FIND_MY_SPAWNS)[0]
}

var spawner = {
    spawning: () => _spawn.spawning,
    run: function(room: Room) {
        if(!Memory.creepId) {
            Memory.creepId = 1;
        }

        _setRoom(room)

        if(room.name == 'E45S9') {
            if(findCreepsOfRole('hauler').length < 1) {
                _spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], "Hauler" + Memory.creepId, { memory:  {role : 'hauler'}})
            }
        } else {
            if(findCreepsOfRole('hauler').length < 1) {
                _spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Hauler" + Memory.creepId, { memory:  {role : 'hauler'}})
            }
        }
    },

    spawnWorker: function(role:string) {
        spawnWorker(role);
    },

    spawnClaimer: function() {
        _spawn.spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE], "Claimer" + Memory.creepId, { memory:  {role : 'claimer'}})
    }
}

export default spawner;
