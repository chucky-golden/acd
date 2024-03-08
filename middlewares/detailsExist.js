const Admin = require('../models/admin')
const Evaluation = require('../models/evaluation')

async function onlyMailExist (email){
    let admin = await Admin.findOne({ email: email  })
    if(admin === null){
        return false
    }else{
        return true
    }
}


async function dateExist (eDate){
    let myDate = await Evaluation.findOne({ bookDate: eDate  })
    if(myDate === null){
        return false
    }else{
        return true
    }
}


module.exports = {
    onlyMailExist,
    dateExist
};