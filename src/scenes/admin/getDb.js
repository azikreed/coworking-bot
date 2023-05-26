const { Scenes } = require("telegraf");
const excel = require('../../utils/excel');
const { Admin, User, Desk } = require("../../database/models");

const scene = new Scenes.BaseScene('admin:getDb');

scene.enter(async (ctx) => {
    // const admins = await Admin.find();
    const users = await User.find();
    const desks = await Desk.find();

    const data = await excel.generateDb({
        // admins,
        users,
        desks
    });

    ctx.replyWithDocument({ source: data, filename: 'baza.xlsx' });
});

module.exports = scene;