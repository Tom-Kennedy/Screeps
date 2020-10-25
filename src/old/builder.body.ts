import _ from "lodash";

let bodyBuilder = {
    init: _init
};

export default bodyBuilder

function _body(parts:BodyPartConstant[]) {
    return {
        parts: parts
    }
}

function _init() {
    let parts :BodyPartConstant[] = []
    return {
        add: function(amount: number, part:BodyPartConstant) {
            parts = parts.concat(_.fill(Array(amount), part))
            return this
        },
        build: function() {
            return _body(parts)
        }
    }
}
