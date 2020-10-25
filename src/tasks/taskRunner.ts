let taskRunner = {
    run: _run
};

export default taskRunner

function _run(creep:Creep, tasks:any[]): boolean {
    // TODO: should try to do previous task here first

    for(let i in tasks) {
        let task = tasks[i]
        if(!creep.memory.task) {
            if(task.do(creep)) {
                creep.memory.task = task.id
                return true
            }
        } else if(creep.memory.task == task.id) {
            if(!task.do(creep)) {
                creep.memory.task = undefined
                creep.memory.targetId = undefined
                return _run(creep, tasks)
            }
            return true
        }
    }
    creep.memory.lastIdleTick = creep.ticksToLive
    return false
}
