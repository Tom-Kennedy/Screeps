let attackRangedTask = {
    id: 'attackRanged',
    do: function(creep:Creep) {
        let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter : (creep => creep.getActiveBodyparts(ATTACK) && creep.getActiveBodyparts(RANGED_ATTACK))})
                || creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(!closestHostile)
            return false

        creep.rangedAttack(closestHostile)
        const targetDistance = creep.pos.getRangeTo(closestHostile)
        if(targetDistance > 3) {
            creep.moveTo(closestHostile)
        } else if(targetDistance < 3 && closestHostile.getActiveBodyparts(ATTACK)) {
            console.log('move?')
            moveAway(creep, creep.pos.getDirectionTo(closestHostile))
        }
        return true
    }
}

export default attackRangedTask

function moveAway(creep:Creep, direction:DirectionConstant) {
    let idealDirection = (direction + 4) % 8
    let moveResult = creep.move(idealDirection as DirectionConstant).valueOf();
    if(moveResult == ERR_INVALID_ARGS) {
        console.log('fail' + moveResult)
        moveResult = creep.move((idealDirection + 8 - 1) % 8 as DirectionConstant)
    }
    if(moveResult == ERR_INVALID_ARGS) {
        moveResult = creep.move((idealDirection + 8 + 1) % 8 as DirectionConstant)
    }
    if(moveResult == ERR_INVALID_ARGS) {
        moveResult = creep.move((idealDirection + 8 - 2) % 8 as DirectionConstant)
    }
    if(moveResult == ERR_INVALID_ARGS) {
        moveResult = creep.move((idealDirection + 8 + 2) % 8 as DirectionConstant)
    }
    if(moveResult == ERR_INVALID_ARGS) {
        moveResult = creep.move((idealDirection + 8 - 3) % 8 as DirectionConstant)
    }
    if(moveResult == ERR_INVALID_ARGS) {
        moveResult = creep.move((idealDirection + 8 + 3) % 8 as DirectionConstant)
    }
}
