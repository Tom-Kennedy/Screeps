import retrieveExcessTask from '../tasks/tasks/retrieveExcessTask'
import retrieveTask from '../tasks/tasks/retrieveTask'
import taskSupply from '../tasks/tasks/supplyTask'
import taskLoadBalance from '../tasks/tasks/loadBalanceTask'
import taskRunner from '../tasks/taskRunner'

let haulerRole = {
    id: 'hauler',
    run: _run
}

export default haulerRole

function _run(creep : Creep) {
    const tasks = [
        taskSupply,
        taskLoadBalance,
        retrieveExcessTask,
        retrieveTask
    ]

    taskRunner.run(creep, tasks)
}
