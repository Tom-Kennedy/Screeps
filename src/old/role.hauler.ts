import taskRetrieveExcess from './task.retrieveExcess'
import taskRetrieve from './task.retrieve'
import taskSupply from './task.supply'
import taskLoadBalance from './task.loadBalance'
import tasksRunner from './tasks.runner'

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
