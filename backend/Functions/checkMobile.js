const { AdminModel } = require("../Models/AdminModel");

const checkMobile = async (mobile) => {

    let adminMobileCheck = await AdminModel.findOne({ mobile: mobile });

    let data = adminMobileCheck ? adminMobileCheck : false

    return data;
};

exports.checkMobile = checkMobile;
