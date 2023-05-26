const config = require("./config");

exports.booked = async (data, ctx, date) => {
    let text = `<b>${ctx.i18n.t("user.send.name")}</b> ${data.user?.fullname}\n<b>${ctx.i18n.t("user.send.desk")}</b> ${data.number}\n<b>${ctx.i18n.t("user.send.expire")}</b> ${date}`;
    ctx.telegram.sendMessage(config.GROUP_ID, text, { parse_mode: "HTML" });
}