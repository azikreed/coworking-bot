const { Markup } = require("telegraf");

exports.welcome = (ctx) => Markup.keyboard([
    [ctx.i18n.t('keyboards.admin.getDb')],
    [ctx.i18n.t('keyboards.admin.updateDb')],
    [ctx.i18n.t('keyboards.main.settings'), ctx.i18n.t('keyboards.main.logout')],
]).resize();