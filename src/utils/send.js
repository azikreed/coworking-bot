const config = require("./config");

exports.booked = async (data, ctx, date) => {
    let text = `<b>${ctx.i18n.t("user.send.name")}</b> <a href="tg://user?id=${data.user.telegramId}">${data.user.fullname}</a>\n<b>${ctx.i18n.t("user.send.desk")}</b> ${data.number}\n<b>${ctx.i18n.t("user.send.goal")}</b> ${data.goal}\n<b>${ctx.i18n.t("user.send.expire")}</b> ${date}`;
    ctx.telegram.sendMessage(config.GROUP_ID, text, { parse_mode: "HTML" });
}

exports.expired = async (data, ctx) => {
    let text = `${ctx.i18n.t("user.send.dear")} <a href="tg://user?id=${data.user.telegramId}"><b>${data.user.fullname}</b></a>\n${ctx.i18n.t("user.send.message")}`;

    ctx.telegram.sendMessage(config.GROUP_ID, text, {parse_mode: "HTML"});
    ctx.telegram.sendMessage(ctx.chat.id, text, { parse_mode: "HTML" });
}