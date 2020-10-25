import roleUpgrader from 'roles/upgraderRole'
import workerRole from 'roles/workerRole'
import minerRole from 'roles/minerRole'
import claimerRole from 'roles/claimerRole'
import roleAttacker from 'roles/attackerRole'
import roleRangedAttacker from 'roles/rangedAttackerRole'
import roleHealer from 'roles/healerRole'
import roleRemoteMiner from 'roles/remoteMinerRole'
import roleLongHauler from 'roles/longHaulerRole'
import roleScout from 'roles/scoutRole'
import roleHauler from 'roles/haulerRole'
import roleBaseBuster from 'roles/baseBusterRole'
import creepHelper from 'utils/creepHelper'
import intelManager from './intelManager'
import _ from "lodash";

const creepManager = {
    run: _run
};

export default creepManager

const _roles = [
    workerRole,
    roleHauler,
    roleUpgrader,
    minerRole,
    claimerRole,
    roleAttacker,
    roleRangedAttacker,
    roleHealer,
    roleRemoteMiner,
    roleLongHauler,
    roleScout,
    roleBaseBuster
]

function _run() {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            const memory = Memory.creeps[name]
            if(memory.role == roleRemoteMiner.id) {
                console.log(name, 'cost: ' + memory.cost, 'harvested: '+ memory.harvested)
                Memory.remoteMinerLog.push({
                    name: name,
                    cost: memory.cost,
                    harvested: memory.harvested
                })
            }
            delete Memory.creeps[name];
        }
    }

    const creeps = Object.values(Game.creeps)
    Memory.creepInfo = intelManager.mapCreeps(creeps)

    creeps.forEach((creep) => {
        creep.memory.cost = creepHelper.getCost(creep)
        creepHelper.maintainArea(creep)
        const role = _.head(_roles.filter((r) => r.id == creep.memory.role))
        role && role.run(creep)
    })
}
