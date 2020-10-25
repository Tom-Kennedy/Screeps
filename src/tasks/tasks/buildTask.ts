import creepHelper from 'utils/creepHelper'

let  buildTask = {
    id:'build',
    do: function(creep: Creep) {
        let target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES)
        if(!target)
            return

        let buildResult = creep.build(target)
        if(buildResult == ERR_NOT_IN_RANGE) {
            const moveResult = creepHelper.moveTo(creep, target, "#ffffff");
            return moveResult == OK || moveResult == ERR_TIRED

        }
        return buildResult == OK
    }
}

export default buildTask
