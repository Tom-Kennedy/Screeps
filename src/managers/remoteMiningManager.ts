import bodyBuilder from 'utils/bodyBuilder'

let remoteMiningManager = {
    run: function() {
        const transitRoomMemory = Memory.rooms['E46S8']
        if(transitRoomMemory && transitRoomMemory.hostileCreeps.fighters.length) {
            return
        }

        const minerHaulerBody = bodyBuilder.init().add(3, WORK).add(4, CARRY).add(7, MOVE).build().parts

        _spawnWorker(
            Game.spawns.Spawn2,
            Game.flags.RemoteMine3,
            Game.flags.Container,
            'remoteMiner',
            2,
            minerHaulerBody)

        _spawnWorker(
            Game.spawns.Spawn2,
            Game.flags.RemoteMine2,
            Game.flags.Container,
            'remoteMiner',
            2,
            minerHaulerBody)

        _spawnWorker(
            Game.spawns.Spawn2,
            Game.flags.RemoteMine,
            Game.flags.Container,
            'remoteMiner',
            2,
            minerHaulerBody)


        // // TODO: this is really just for tonight
        // if(Game.rooms['E45S8'].memory.storageInfo.usedPercentage > .8) {
        //     spawnWorker(
        //         Game.spawns.Spawn2,
        //         Game.flags.Container,
        //         Game.flags.Storage,
        //         'longHauler',
        //         3,
        //         bodyBuilder.init().add(1, WORK).add(7, CARRY).add(4, MOVE).build().parts)
        // }
    }
}

export default remoteMiningManager

function _spawnWorker(spawn: StructureSpawn, retrieveFlag: Flag, depositFlag:Flag,  role: string, needed: number, body: BodyPartConstant[]) {
    const roomMemory = Memory.rooms[retrieveFlag.pos.roomName]
    if(!retrieveFlag || (roomMemory && roomMemory.hostileCreeps.fighters.length)) {
        return
    }
    const currentCount = Object.values(Game.creeps).filter((creep) => creep.memory.role == role && creep.memory.goToRetrieveFlagName == retrieveFlag.name).length
    if(currentCount < needed && retrieveFlag && depositFlag && !spawn.spawning) {
        spawn.spawnCreep(
            body,
            role + retrieveFlag.name + 'N' + Game.time,
            { memory: {role: role, goToRetrieveFlagName: retrieveFlag.name, goToDepositFlagName: depositFlag.name, spawnId: spawn.id }})
    }
}
