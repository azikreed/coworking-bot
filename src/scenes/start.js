const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const keyboards = require("../keyboards");

const scene = new Scenes.BaseScene('start');

scene.enter((ctx) => {
    let text = ctx.i18n.t("choose");
    let keyboard = keyboards.start.main(ctx);
    ctx.reply(text, keyboard);
});


scene.hears(match('keyboards.main.login'), ctx => ctx.scene.enter('auth:login'));
scene.hears(match('keyboards.main.settings'), ctx => ctx.scene.enter('settings'));
scene.hears(match('keyboards.main.logout'), ctx => ctx.scene.enter('auth:logout'));
scene.hears(match('keyboards.user.desk'), ctx => ctx.scene.enter('user:desk'));

module.exports = scene;