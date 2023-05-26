const { Scenes, Markup } = require("telegraf");
const { Admin, User } = require("../../database/models");
const keyboards = require("../../keyboards");
const { match } = require("telegraf-i18n");

const scene = new Scenes.WizardScene(
    "auth:login",
    (ctx) => {
        const text = ctx.i18n.t('login.username');
        const keyboard = keyboards.common.back(ctx);
        ctx.replyWithHTML(text, keyboard);
        ctx.wizard.next();
    },
    (ctx) => {
        let username = ctx.message.text;
        if (!username) {
            return ctx.scene.reenter();
        }
        ctx.wizard.state.username = username;

        let text = ctx.i18n.t("login.password");
        ctx.replyWithHTML(text);
        ctx.wizard.next();
    },
    async (ctx) => {
        const password = ctx.message.text;

        if (!password) {
            return ctx.scene.reenter();
        }

        ctx.wizard.state.password = password;
        const user = await User.findOne(ctx.wizard.state);
        console.log("user==================", user);

        if (!user) {
            ctx.reply(ctx.i18n.t("login.error"))
            return ctx.scene.enter("start");
        }

        ctx.session.user = user;
        ctx.reply(ctx.i18n.t("login.success"));
        ctx.scene.enter("start");
    }
);

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('start'));

module.exports = scene;
