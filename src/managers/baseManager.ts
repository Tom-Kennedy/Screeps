import roleWorker from 'roles/workerRole'
import roleMiner from 'roles/minerRole'
import roleUpgrader from 'roles/upgraderRole'
import spawner from 'old/spawner'
import towerManager from './towerManager'

const baseManager = {
    manage: _manage,
}

export default baseManager

function _manage(room: Room) {
    let roleInfo = getRoleInfo(room)
    spawn(room, roleInfo)
    towerManager.run(room)
    room.memory.roleInfo = roleInfo
}

function spawn(room:Room, roleInfo:any) {
    spawner.run(room)

    for(const roleId in roleInfo) {
        const requiredCount = roleInfo[roleId].requested
        if(!requiredCount)
            break

        const currentAmount = room.find(FIND_MY_CREEPS, { filter: (creep) => creep.memory.role == roleId }).length
        if(currentAmount < requiredCount && !spawner.spawning()) {
            spawner.spawnWorker(roleId)
        }
    }
}

function getRoleInfo(room: Room) {
    return room.memory.roleInfo || (room.memory.roleInfo = {
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
