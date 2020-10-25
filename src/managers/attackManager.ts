import bodyBuilder from 'utils/bodyBuilder'
import _ from "lodash";

let attackManager = {
    run: _run
}

export default attackManager

function _run() {
    _spawnScout(Game.spawns.Spawn2, Game.flags.Scout, 1, 1, bodyBuilder.init().add(1, MOVE).build().parts)
    // _spawnScout(Game.spawns.Spawn2, Game.flags.Scout2, 1, 1, bodyBuilder.init().add(1, MOVE).build().parts)

    _attack()
    _harass()
    // _assault()
}

function _harass() {
    const flag = Game.flags.Scout

    let roomMemory = flag ? Memory.rooms[flag.pos.roomName] : undefined
    if(!roomMemory)
        return

    let isEnemyBase = roomMemory.controllerInfo.username && !roomMemory.controllerInfo.my
    let shouldHarass = roomMemory.hostileCreeps.fighters.length > 0 &&
            roomMemory.hostileCreeps.attackParts == 0 &&
            roomMemory.hostileCreeps.attackParts == 0 &&
            !isEnemyBase
    if(shouldHarass) {
        _spawnScout(Game.spawns.Spawn2, Game.flags.Scout, 0, 3)
    }
}

function _assault() {
    let assaultFlag = Game.flags.Assault
    if(!assaultFlag)
        return

    // _spawnScout(
    //     Game.spawns.Spawn1,
    //     scoutFlag,
    //     'scout',
    //     1,
    //     1500,
    //     bodyBuilder.init().add(1, MOVE).build().parts)

    _spawnScout(Game.spawns.Spawn1, assaultFlag, 1, 0, bodyBuilder.init().add(1, WORK).add(1, MOVE).build().parts, "baseBuster")

    // if(Memory[assaultFlag.roomName].towerEnergy == 0) {

    // }

}

function _attack() {
    let roomToAttack: RoomMemory | undefined
    let attackFlag = Game.flags.Attack
    if(attackFlag) {
        roomToAttack = Memory.rooms[attackFlag.pos.roomName]
    }

    roomToAttack = _shouldAttackRoom(roomToAttack) ? roomToAttack : _(Memory.rooms).filter(_shouldAttackRoom).head() as RoomMemory
    if(!roomToAttack) {
        return
    }

    if(!attackFlag) {
        let posIntel = roomToAttack.hostileCreeps.fighters[0].pos
        let pos = new RoomPosition(posIntel.x, posIntel.y, posIntel.roomName)
        if(Game.rooms[pos.roomName]) {
            pos.createFlag('Attack')
        }
    }

    attackFlag = Game.flags.Attack
    let rallyFlag = Game.flags.Rally

    if(!rallyFlag || !attackFlag) {
        return
    }

    let allFighters = _(Game.creeps).filter((creep:Creep) => creep.memory.isFighter)
    console.log(allFighters.size())

    let attackRoom = attackFlag.room
    let fightersInCombat = attackRoom ? attackRoom.find(FIND_MY_CREEPS, {filter : (creep) => creep.memory.isFighter && !creep.getActiveBodyparts(HEAL)}): []
    let haveAllRallied = allFighters.every((creep:Creep) => creep.memory.hasRallied)
    let hasSpawnedAllFighters = _spawnFighters(Game.spawns.Spawn1, rallyFlag, attackFlag, roomToAttack.hostileCreeps)
    let hasRallied:boolean = (haveAllRallied && hasSpawnedAllFighters) || fightersInCombat.length > 0

    let rallyingFighters = allFighters.filter((creep: Creep) => creep.pos.roomName != attackFlag.pos.roomName)
    let hostileOnPath:any = rallyingFighters.map((creep: Creep) => _(creep.room.memory.hostileCreeps.fighters)).flatten().head()
    if(hostileOnPath) {
        attackFlag.setPosition(hostileOnPath.pos)
    }

    Memory.rooms[attackFlag.pos.roomName].hasRallied = hasRallied
    console.log('fightersInCombat:' + fightersInCombat.length, 'hasSpawnedAllFighters:' + hasSpawnedAllFighters, 'haveAllRallied:' + haveAllRallied)
}

function _shouldAttackRoom(roomIntel?:RoomMemory) {
    if(!roomIntel || !roomIntel.controllerInfo)
        return

    let isEnemyBase = roomIntel.controllerInfo.username && !roomIntel.controllerInfo.my
    return roomIntel.hostileCreeps.fighters.length > 0 && !isEnemyBase
}

function _spawnFighters(spawn:StructureSpawn, rallyFlag:Flag, attackFlag:Flag, hostileFighterInfo: HostileCreepMemory) {
    let myFighterInfo = Memory.creepInfo.fighterInfo
    if(myFighterInfo.attackParts < hostileFighterInfo.attackParts)
    {
        _spawnFighter(
            spawn,
            rallyFlag,
            attackFlag,
            'attacker',
            bodyBuilder.init().add(9, TOUGH).add(14, MOVE).add(6, ATTACK).add(1, MOVE).build().parts,
            true)
        return false
    }

    if(myFighterInfo.rangedParts < hostileFighterInfo.rangedParts) {
        _spawnFighter(
            spawn,
            rallyFlag,
            attackFlag,
            'rangedAttacker',
            bodyBuilder.init().add(2, TOUGH).add(5, RANGED_ATTACK).add(7, MOVE).build().parts,
            true)
        return false
    }

    if(myFighterInfo.healerParts == 0) {
        _spawnFighter(
            spawn,
            rallyFlag,
            attackFlag,
            'healer',
            bodyBuilder.init().add(5, TOUGH,).add(7, MOVE).add(2, HEAL).build().parts,
            false)
    }

    return true
}

function _spawnScout(spawn: StructureSpawn, scoutFlag: Flag, ticks: number, maxCount = 1, body?: BodyPartConstant[], role = "scout") {
    if(!scoutFlag || spawn.spawning)
        return

    let realBody:BodyPartConstant[] = body || bodyBuilder.init().add(1, ATTACK).add(1, MOVE).build().parts

    let currentCount = Object.values(Game.creeps).filter((creep) => creep.memory.role == role && creep.memory.scoutFlag == scoutFlag.name).length
    if(currentCount >= maxCount) {
        return
    }

    if(!Memory.rooms[scoutFlag.pos.roomName] || (Memory.rooms[scoutFlag.pos.roomName] && Game.time > Memory.rooms[scoutFlag.pos.roomName].lastSeenTick + ticks)) {
        if(!spawn.spawning) {
            console.log('spawning '+ role)
            spawn.spawnCreep(realBody, role + Game.time, { memory: {role: role, scoutFlag: scoutFlag.name}})
        }
    }
}

function _spawnFighter(spawn:StructureSpawn, rallyFlag:Flag, attackFlag:Flag, role:string, body:BodyPartConstant[], isFighter:boolean) {
    if(!spawn.spawning) {
        console.log('spawning '+ role)
        spawn.spawnCreep(body, role + Game.time, { memory: {role: role, rallyFlagName: rallyFlag.name, attackFlagName: attackFlag.name, isFighter: true}})
    }
}
