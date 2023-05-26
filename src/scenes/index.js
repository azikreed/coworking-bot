const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([
    require('./start'),
    ...require('./auth'),
    ...require('./admin'),
    ...require('./user'),
    require("./settings"),
    require("./language")
]);

module.exports = stage;