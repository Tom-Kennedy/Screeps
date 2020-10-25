let claimTask = {
    id: 'claim',
    do: function(creep: Creep) {
        if(!Game.flags.Claim || !Game.flags.Claim.room?.controller)
            return

        let controller = Game.flags.Claim.room.controller
        if(creep.claimController(controller) == ERR_NOT_IN_RANGE) {
            const moveResult = creep.moveTo(controller, { visualizePathStyle: { stroke: "#FF00FF" } });
            return moveResult != ERR_NO_PATH;

        }
        return true
    }
}

export default claimTask
