import taskRunner from '../tasks/taskRunner'
import retrieveTask from '../tasks/tasks/retrieveTask'
import mineTask  from '../tasks/tasks/mineTask'
import supplyTask from '../tasks/tasks/supplyTask'
import buildTask from '../tasks/tasks/buildTask'
import upgradeTask from '../tasks/tasks/upgradeTask'
import repairTask from '../tasks/tasks/repairTask'
import maintainDefensesTask from '../tasks/tasks/maintainDefensesTask'
import bodyBuilder from "../old/builder.body"

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
    capacity = Math.floor(capacity/50) * 50
    console.log(capacity)

    const totalWorkerParts = capacity / 50;
    const workBodies = Math.floor(totalWorkerParts / 4);
    const moveBodies = workBodies;
    const carryBodies = totalWorkerParts - Math.floor(workBodies * 2) - moveBodies;

    return bodyBuilder.init()
        .add(Math.min(workBodies, 6), WORK)
        .add(Math.min(carryBodies, 6), CARRY)
        .add(Math.min(moveBodies, 6), MOVE)
        .build().parts
}

export default workerRole
