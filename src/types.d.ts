// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
    harvested?: number
    scoutFlag?: string
    goToRetrieveFlagName?: string
    goToDepositFlagName?: string
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
    creepInfo: any
    hasRallied: boolean
    towerEnergy: number
    sources: any
    spawnInfo: any
    storageInfo: any
    roleInfo?: any
}

interface Memory {
    creepId: number
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
