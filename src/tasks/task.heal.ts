
let taskHeal = {
    id: 'heal',
    do: function(creep: Creep) {
        let closestDamagedCreep = creep.hits < creep.hitsMax ? creep : creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter : (c) => c.hits < c.hitsMax})
        if(closestDamagedCreep) {
            creep.rangedHeal(closestDamagedCreep)
            creep.heal(closestDamagedCreep)
            creep.moveTo(closestDamagedCreep)
        }


        let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        if(closestHostile) {
            let hostileDistance = creep.pos.getRangeTo(closestHostile)
            if(hostileDistance < 4) {
                console.log('test')
                moveAway(creep, creep.pos.getDirectionTo(closestHostile))
            }
        }

        // if(!closestDamagedCreep) {
        //     var closestFighter
        // }

        return !!closestDamagedCreep
    }
}

export default taskHeal

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
