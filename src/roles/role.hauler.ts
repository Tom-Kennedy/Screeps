import taskRetrieveExcess from '../tasks/task.retrieveExcess'
import taskRetrieve from '../tasks/task.retrieve'
import taskSupply from '../tasks/task.supply'
import taskLoadBalance from '../tasks/task.loadBalance'
import tasksRunner from '../tasks/tasks.runner'

let haulerRole = {
    id: 'hauler',
    run: _run
}

export default haulerRole

function _run(creep : Creep) {
    const tasks = [
        taskSupply,
        taskLoadBalance,
        taskRetrieveExcess,
        taskRetrieve
    ]

    tasksRunner.run(creep, tasks)
}
