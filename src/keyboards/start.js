const { Markup } = require("telegraf");

const main = (ctx) =>

    ctx.session.user?.fullname ?
        Markup.keyboard([
            [ctx.i18n.t('keyboards.user.desk')],
            [ctx.i18n.t('keyboards.main.settings'), ctx.i18n.t("keyboards.main.logout")],
        ]).resize() :
        Markup.keyboard([
            [ctx.i18n.t('keyboards.main.login'), ctx.i18n.t('keyboards.main.settings')]
        ]).resize();

module.exports = {
    main
};