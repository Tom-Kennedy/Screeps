import creepHelper from 'utils/creepHelper'

let goToFlagTask = {
    createTask : function(flag?:Flag, condition?:any) {
        if(!flag) {
            return {
                id: 'goToFlag',
                do: function() {
                    //
                    return false
                }
            }
        }
        // console.log(flag)
        return {
            id: 'goToFlag' + flag.name,
            do: function(creep: Creep) {
                // console.log('attempt', creep, flag)
                if((condition && !condition(creep))) {
                    // console.log('fail condition 1', creep, flag)
                    return false
                }

                // console.log(flag)
                if(!flag || creep.pos.inRangeTo(flag.pos, 3)) {
                    // console.log('fail condition 2', creep, flag, creep.pos.inRangeTo(flag.pos, 3), creep.room.find(FIND_HOSTILE_CREEPS).length)
                    return false
                }

                // console.log('success', creep, flag)
                creepHelper.moveTo(creep, flag.pos, '#ffffff')
                return true
            }
        }
    }
}

export default goToFlagTask
