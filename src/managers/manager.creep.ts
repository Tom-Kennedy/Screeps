import roleUpgrader from './role.upgrader'
import roleWorker from './role.worker'
import roleMiner from './role.miner'
import roleClaimer from './role.claimer'
import roleAttacker from './role.attacker'
import roleRangedAttacker from './role.rangedAttacker'
import roleHealer from './role.healer'
import roleRemoteMiner from './role.remoteMiner'
import roleLongHauler from './role.longHauler'
import roleScout from './role.scout'
import roleHauler from './role.hauler'
import roleBaseBuster from './role.baseBuster'
import creepHelper from './helper.creep'
import intelManager from './manager.intel'
import _ from "lodash";

const creepManager = {
    run: _run
};

export default creepManager

const _roles = [
    roleWorker,
    roleHauler,
    roleUpgrader,
    roleMiner,
    roleClaimer,
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

    // for(var name in Game.creeps) {
    //     var creep = Game.creeps[name];

    //     // TODO: move this line of code
    //     creep.memory.cost = creepHelper.getCost(creep)
    //     creepHelper.maintainArea(creep)
    //     var role = _.head(_roles.filter((r) => r.id == creep.memory.role))
    //     role && role.run(creep)

    // }
}
