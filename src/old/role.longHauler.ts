import taskGoTo from "./task.goToFlag"
import taskRetrieve from './task.retrieveExcess'
import taskStore from './task.store'
import tasksRunner from './tasks.runner'

let longHaulerRole = {
    id: 'longHauler',
    run: function(creep: Creep) {
        const tasks = [
            // @ts-ignore
            taskGoTo.createTask(Game.flags[creep.memory.goToRetrieveFlagName], (c) => c.store.getUsedCapacity() < c.store.getCapacity() * .75),
            // @ts-ignore
            taskGoTo.createTask(Game.flags[creep.memory.goToDepositFlagName], (c) => c.store.getUsedCapacity() > c.store.getCapacity() * .75),
            taskStore,
            taskRetrieve
        ];
        return tasksRunner.run(creep, tasks)
    }
};

export default longHaulerRole
