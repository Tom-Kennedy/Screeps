import taskRunner from '../tasks/taskRunner'
import retrieveTask from '../tasks/tasks/retrieveTask'
import mineTask  from '../tasks/tasks/mineTask'
import supplyTask from '../tasks/tasks/supplyTask'
import buildTask from '../tasks/tasks/buildTask'
import upgradeTask from '../tasks/tasks/upgradeTask'
import repairTask from '../tasks/tasks/repairTask'
import maintainDefensesTask from '../tasks/tasks/maintainDefensesTask'

const taskList = [
    supplyTask,
    buildTask,
    repairTask,
    maintainDefensesTask,
    upgradeTask,
    retrieveTask,
    mineTask
]

let workerRole = {
    id: 'worker',
    generateBody: _generateBody,
    run: function (creep: Creep) {
        return taskRunner.run(creep, taskList)
    }
}

function _generateBody(capacity: number) {
    let i;
    capacity = Math.floor(capacity/50) * 50
    console.log(capacity)

    const totalWorkerParts = capacity / 50;
    const workBodies = Math.floor(totalWorkerParts / 4);
    const moveBodies = workBodies;
    const carryBodies = totalWorkerParts - Math.floor(workBodies * 2) - moveBodies;
    const body = [];
    for(i = 0; i < Math.min(workBodies, 6); i++) {
        body.push(WORK)
    }

    for(i = 0; i < Math.min(moveBodies, 6); i++) {
        body.push(MOVE)
    }

    for(i = 0; i < Math.min(carryBodies, 6); i++) {
        body.push(CARRY)
    }

    return body
}

export default workerRole
