let assaultRoomTask = {
    id: 'assaultRoom',
    do: function(creep: Creep) {
        const rallyFlag = creep.memory.rallyFlagName ? Game.flags[creep.memory.rallyFlagName] : undefined;
        const attackFlag = creep.memory.attackFlagName ? Game.flags[creep.memory.attackFlagName] : undefined;
        if(!rallyFlag || creep.room.find(FIND_HOSTILE_CREEPS).length) {
            return false
        }

        const hasRallied = attackFlag && Memory.rooms[attackFlag.pos.roomName].hasRallied;
        if(hasRallied && attackFlag) {
            creep.moveTo(attackFlag)
            return true
        }

        if(creep.pos.inRangeTo(rallyFlag, 5)) {
            creep.memory.hasRallied = true
        }

        creep.moveTo(rallyFlag)

        return true
    }
}

export default assaultRoomTask
