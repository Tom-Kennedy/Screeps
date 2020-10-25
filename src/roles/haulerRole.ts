import retrieveExcessTask from '../tasks/tasks/retrieveExcessTask'
import retrieveTask from '../tasks/tasks/retrieveTask'
import taskSupply from '../tasks/tasks/supplyTask'
import taskLoadBalance from '../tasks/tasks/loadBalanceTask'
import taskRunner from '../tasks/taskRunner'
import bodyBuilder from "../utils/bodyBuilder"

let haulerRole = {
    id: 'hauler',
    generateBody: _generateBody,
    run: _run
}

export default haulerRole

function _generateBody(capacity: number) {
    // TODO: rework to be more dynamic
    return bodyBuilder.init().add(1, WORK).add(7, CARRY).add(4, MOVE).build().parts
}

function _run(creep : Creep) {
    const tasks = [
        taskSupply,
        taskLoadBalance,
        retrieveExcessTask,
        retrieveTask
    ]

    taskRunner.run(creep, tasks)
}
