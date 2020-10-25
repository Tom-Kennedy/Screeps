import mineTask from '../tasks/tasks/mineTask'
import retrieveTask from '../tasks/tasks/retrieveTask'
import upgradeTask from '../tasks/tasks/upgradeTask'
import taskRunner from '../tasks/taskRunner'
import bodyBuilder from "../utils/bodyBuilder"

class UpgraderRole implements Role {
    readonly taskPriority = [
        retrieveTask,
        upgradeTask,
        mineTask
    ]

    id = 'upgrader'

    generateBody(capacity: number): BodyPartConstant[] {
        return bodyBuilder.init()
            .add(1, WORK)
            .add(2, CARRY)
            .add(2, MOVE)
            .build().parts
    }

    run(creep:Creep) {
        return taskRunner.run(creep, this.taskPriority)
    }
}

const upgraderRole = new UpgraderRole()
export default upgraderRole
