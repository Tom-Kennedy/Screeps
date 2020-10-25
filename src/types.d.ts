// example declaration file - remove these and add your own custom typings

// memory extension samples

interface CreepMemory {
    harvested?: number
    scoutFlag?: string
    goToRetrieveFlagName?: string
    goToDepositFlagName?: string
    originRoom?: string
    spawnId?: string
    role: string
    rallyFlagName?: string
    attackFlagName?: string
    isFighter?: boolean
    hasRallied?: boolean
    task?: string
    targetId?: string
    lastIdleTick?: number
    cost?: number
}

interface RoomMemory {
    name: string
    lastSeenTick: number
    controllerInfo: any
    hostileCreeps: HostileCreepMemory
    hasRallied: boolean
    towerEnergy: number
    sources: any
    spawnInfo: any
    storageInfo: any
    hostileBase?: HostileBaseMemory
}

interface HostileBaseMemory {
    towerEnergy: number
}

interface HostileCreepMemory {
    workers: CreepInfo[]
    workerCost: number
    fighters: CreepInfo[]
    fighterCost: number
    attackParts: number
    rangedParts: number
    healerParts: number
    totalCost: number
}

interface CreepInfo {
    pos: any
    body: BodyPartDefinition[]
    hits: number
    hitsMax: number
    id: string
    my: boolean
    name: string
    ownerName: string
    ticksToLive?: number
    cost: number
    attackParts: number
    rangedParts: number
    healerParts: number
    isFighter: boolean
}

interface Memory {
    creepInfo: any
    remoteMinerLog:any
}

// interface ControllerInfo {
//     username?: string
//     my: boolean
// }

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
