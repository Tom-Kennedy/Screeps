import roleWorker from 'roles/workerRole'
import roleMiner from 'roles/minerRole'
import roleUpgrader from 'roles/upgraderRole'
import spawnManager from 'managers/spawnManager'
import towerManager from './towerManager'

const baseManager = {
    manage: _manage,
}

export default baseManager

function _manage(room: Room) {
    let roleInfo = getRoles(room)
    spawn(room, roleInfo)
    towerManager.run(room)
    room.memory.roles = roleInfo
}

function spawn(room:Room, roleInfo:RolesMemory) {
    spawnManager.run(room)

    for(const roleId in roleInfo) {
        const role = roleInfo[roleId]
        const requiredCount = role.requested
        if(!requiredCount)
            break

        const currentAmount = room.find(FIND_MY_CREEPS, { filter: (creep) => creep.memory.role == roleId }).length
        if(currentAmount < requiredCount && !spawnManager.spawning()) {
            spawnManager.spawnWorker(roleId)
        }
    }
}

function getRoles(room: Room) {
    return room.memory.roles || (room.memory.roles = {
            [roleUpgrader.id]: {
                requested: 1
            },
            [roleMiner.id]: {
                requested: 2
            },
            [roleWorker.id]: {
                requested: 1
            },
    })
}
