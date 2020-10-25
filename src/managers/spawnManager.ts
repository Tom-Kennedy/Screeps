import workerRole from "../roles/workerRole"
import haulerRole from "../roles/haulerRole"
import upgraderRole from "../roles/upgraderRole"

function _spawnWorker(room: Room, role: string) {
    const spawn = _(room.find(FIND_MY_SPAWNS)).head()
    if(!spawn || spawn.spawning)
        return

    const name = role + Game.time;
    const parts = _getBodyForRole(role, spawn.room.energyCapacityAvailable)
    const isSpawned = spawn.spawnCreep(parts, name, { memory: { role: role, originRoom: spawn.room.name }})
    if(isSpawned == OK) {
        console.log("Spawning" + name);
    }
}

function _getBodyForRole(role:string, capacity:number) {
    if(role == haulerRole.id) {
        return haulerRole.generateBody(capacity)
    }
    if(role == upgraderRole.id) {
        return upgraderRole.generateBody(capacity)
    }
    return workerRole.generateBody(capacity)
}

const spawnManager = {
    spawnWorker: _spawnWorker
}

export default spawnManager;
