import creepHelper from './helper.creep'

let taskUpgrade = {
    id: 'upgrade',
    do : function(creep: Creep) {
        if(creep.store.getUsedCapacity() == 0 || !creep.room.controller)
            return false

        const upgradeResult = creep.upgradeController(creep.room.controller)
        if(upgradeResult == ERR_NOT_IN_RANGE) {
            const moveResult = creepHelper.moveTo(creep, creep.room.controller, '#FF00FF')
            return moveResult == OK || moveResult == ERR_TIRED

        } else if(upgradeResult != OK) {
            return false
        }
        return true
    }
}

export default taskUpgrade
