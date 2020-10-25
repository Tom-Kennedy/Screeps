import taskGoTo from "../tasks/tasks/goToFlagTask"
import taskRetrieve from '../tasks/tasks/retrieveExcessTask'
import storeTask from '../tasks/tasks/storeTask'
import taskRunner from '../tasks/taskRunner'

let longHaulerRole = {
    id: 'longHauler',
    run: function(creep: Creep) {
        const tasks = [
            // @ts-ignore
            taskGoTo.createTask(Game.flags[creep.memory.goToRetrieveFlagName], (c) => c.store.getUsedCapacity() < c.store.getCapacity() * .75),
            // @ts-ignore
            taskGoTo.createTask(Game.flags[creep.memory.goToDepositFlagName], (c) => c.store.getUsedCapacity() > c.store.getCapacity() * .75),
            storeTask,
            taskRetrieve
        ];
        return taskRunner.run(creep, tasks)
    }
};

export default longHaulerRole
