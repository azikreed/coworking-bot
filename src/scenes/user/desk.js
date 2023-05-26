const { Scenes, Markup } = require("telegraf");
const excel = require('../../utils/excel');
const { Desk, User } = require("../../database/models");
const keyboards = require("../../keyboards");
const { match } = require("telegraf-i18n");
const { Pagination } = require("telegraf-pagination");
const cron = require("node-cron");
const { booked } = require("../../utils/send");

const scene = new Scenes.BaseScene('user:desk');
scene.enter(
    async (ctx) => {
        const desks = await Desk.find({ available: true });
        if (desks?.length < 1) {
            ctx.reply(ctx.i18n.t("user.desk.notfound"));
            return ctx.scene.enter("start");
        } else {
            const pagination = new Pagination({
                data: desks,
                format: (item, index) => `${index + 1}. ${item.number}-${ctx.i18n.t("user.desk.text")}`,
                onSelect: (item, index, ctx) => {
                    const text = `<b>🖥 ${item.number}</b>-parta`;
                    const keyboard = Markup.inlineKeyboard([
                        [
                            Markup.button.callback(ctx.i18n.t("keyboards.common.agree"), `yes_${item._id}`),
                            Markup.button.callback(ctx.i18n.t("keyboards.common.disagree"), `no_${item._id}`)
                        ],
                    ])
                    ctx.replyWithHTML(text, keyboard);
                },
                isEnabledDeleteButton: false,
            })
            pagination.handleActions(scene);
            const keyboard = keyboards.common.back(ctx);
            ctx.reply(await pagination.text(), await pagination.keyboard());
            ctx.replyWithHTML(ctx.i18n.t("textback"), keyboard);
        }
    },
);



scene.action(/yes_(.+)/, async (ctx) => {
    const id = ctx.match[1];

    const changeAvailability = async () => {
        await Desk.findOneAndUpdate({ _id: id }, { available: true, user: null });
    }

    const user = await User.findOne({ _id: ctx.session.user._id });
    if (user.limit) {
        ctx.reply(ctx.i18n.t("user.desk.limit"));
        return ctx.scene.enter("start");
    }
    ctx.session.user = user;

    const desk = await Desk.findOneAndUpdate(
        { _id: id, available: true }, { available: false, user: ctx.session.user }, { new: true }
    ).populate("user");
    if (!desk) {
        return ctx.scene.reenter();
    }
    await User.findOneAndUpdate({ _id: ctx.session.user._id }, { limit: true });

    const text = ctx.i18n.t("user.desk.status");

    let hour = desk.updatedAt.getHours();
    let minute = desk.updatedAt.getMinutes();
    const date = `${hour.toString().length < 2 ? +"0" + (hour + 2).toString() : +(hour + 2).toString()}:${minute.toString().length < 2 ? "0" + minute.toString() : minute.toString()}`;
    booked(desk, ctx, date);
    cron.schedule(`${minute} ${hour + 2 == 24 ? 0 : hour + 2} * * *`, changeAvailability);
    ctx.replyWithHTML(text);
    ctx.scene.enter("start");
});

scene.action(/no_(.+)/, (ctx) => {
    return ctx.scene.enter("user:desk");
});

scene.hears(match("keyboards.common.back"), (ctx) => {
    return ctx.scene.enter("start");
})

module.exports = scene;