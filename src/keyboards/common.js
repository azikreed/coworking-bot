const { Markup } = require("telegraf");

const back = ctx => Markup.keyboard([
    [ctx.i18n.t('keyboards.common.back')]
]).resize();

const language = Markup.keyboard([
    ["🇺🇿 O'zbek", "🇷🇺 Русский", "🇺🇸 English"],
]).resize();

const agreement = ctx => Markup.keyboard([
    [ctx.i18n.t("keyboards.common.agree"), ctx.i18n.t("keyboards.common.disagree")]
]).resize();

module.exports = {
    back,
    language,
    agreement
};