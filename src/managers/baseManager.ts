import spawnManager from 'managers/spawnManager'
import towerManager from './towerManager'
import workerRole from "roles/workerRole"
import upgraderRole from "roles/upgraderRole"
import haulerRole from 'roles/haulerRole'
import minerRole from "../roles/minerRole"

const baseManager = {
    manage: _manage,
}

export default baseManager

function _manage(room: Room) {
    spawn(room)
    towerManager.run(room)
}

function spawn(room:Room) {
    if(_findCreepsOfRole(room, haulerRole.id).length < 1) {
        spawnManager.spawnWorker(room, haulerRole.id)
    }

    if(_findCreepsOfRole(room, workerRole.id).length < 1) {
        spawnManager.spawnWorker(room, workerRole.id)
    }

    if(_findCreepsOfRole(room, upgraderRole.id).length < 1) {
        spawnManager.spawnWorker(room, upgraderRole.id)
    }

    if(_findCreepsOfRole(room, minerRole.id).length < room.find(FIND_SOURCES).length) {
        spawnManager.spawnWorker(room, minerRole.id)
    }
}

function _findCreepsOfRole(room: Room, roleId: string) {
    return room.find(FIND_MY_CREEPS, {
        filter: { memory: { role: roleId } }
    });
}
