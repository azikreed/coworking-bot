const { Scenes, Markup } = require("telegraf");
const { match } = require("telegraf-i18n");
const keyboards = require("../../keyboards/");
const scene = new Scenes.BaseScene("auth:logout");

scene.enter((ctx) => {
    const text = ctx.i18n.t("logout.text");
    const keyboard = keyboards.common.agreement(ctx);
    ctx.reply(text, keyboard);
});

scene.hears(match("keyboards.common.agree"), (ctx) => {
    ctx.session.user = null;
    ctx.scene.enter("start");
});

scene.hears(match("keyboards.common.disagree"), (ctx) => ctx.scene.enter("start"));

module.exports = scene;
