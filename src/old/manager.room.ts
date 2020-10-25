import baseManager from './manager.base'
import intelManager from './manager.intel'

let roomManager = {
    run: _run
}
export default roomManager

function _run() {
    for(let roomName in Game.rooms) {
        let room = Game.rooms[roomName]
        intelManager.manage(room)
        if(room.controller && room.controller.my)
            baseManager.manage(room)
    }
}
