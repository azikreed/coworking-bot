const ExcelJS = require('exceljs');
const { Stream } = require('stream');
const logger = require('./logger');
const { Admin, User, Desk } = require("../database/models");

exports.generateDb = async ({
    users,
    // admins,
    desks
}) => {
    const workbook = new ExcelJS.Workbook();

    //admins
    // const adminsSheet = workbook.addWorksheet("Adminlar");
    // adminsSheet.columns = [
    //     { header: "T/r", key: "number", width: 5 },
    //     { header: "Username", key: "username", width: 30 },
    //     { header: "Parol", key: "password", width: 30 },
    // ];

    // admins.forEach((admin, index) => {
    //     admin.number = index + 1;
    //     admin.username = admin.username;
    //     admin.password = admin.password;
    //     adminsSheet.addRow(admin);
    // });

    // adminsSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    //users
    const usersSheet = workbook.addWorksheet("Studentlar");
    usersSheet.columns = [
        { header: "T/r", key: "number", width: 5 },
        { header: "Ism-Familiya", key: "fullname", width: 40 },
        { header: "Telefon", key: "phone", width: 30 },
        { header: "Username", key: "username", width: 30 },
        { header: "Parol", key: "password", width: 30 },
    ];

    users.forEach((user, index) => {
        user.number = index + 1;
        user.fullname = user.fullname;
        user.phone = user.phone;
        user.username = user.username;
        user.password = user.password;
        usersSheet.addRow(user);
    })

    usersSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    const desksSheet = workbook.addWorksheet("Partalar");
    desksSheet.columns = [
        { header: "Raqami", key: "number", width: 8 }
    ];

    desks.forEach((desk) => {
        desk.number = desk.number;
        desksSheet.addRow(desk);
    })

    desksSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    return await workbook.xlsx.writeBuffer();
}

exports.updateDb = async (data, cb) => {
    let workbook = new ExcelJS.Workbook();
    const stream = new Stream.Readable();
    stream.push(data);
    stream.push(null);
    workbook.xlsx.read(stream).then(async workbook => {
        const usersSheet = workbook.getWorksheet("Studentlar");
        // const adminsSheet = workbook.getWorksheet("Adminlar");
        const desksSheet = workbook.getWorksheet("Partalar");

        if (!usersSheet || !desksSheet) {
            return cb(false);
        }

        // let admins = [];
        // adminsSheet.eachRow(row => {
        //     if (row.number > 1) {
        //         admins.push({
        //             username: row.getCell(2).value,
        //             password: row.getCell(3).value,
        //         })
        //     }
        // })

        // await Admin.deleteMany({});
        // await Admin.insertMany(admins);

        let users = [];
        usersSheet.eachRow(row => {
            if (row.number > 1) {
                users.push({
                    fullname: row.getCell(2).value,
                    phone: row.getCell(3).value,
                    username: row.getCell(4).value,
                    password: row.getCell(5).value,
                })
            }
        })

        await User.deleteMany({});
        await User.insertMany(users);

        let desks = [];
        desksSheet.eachRow(row => {
            if (row.number > 1) {
                desks.push({
                    number: row.getCell(1).value
                })
            }
        })

        await Desk.deleteMany({});
        await Desk.insertMany(desks);

        cb(true);
    })
}