const Admin = require('../models/admin')
const Evaluation = require('../models/evaluation')
const Newsletter = require('../models/newsletters')
const passwordHash = require('../middlewares/passwordencrypt')
const { onlyMailExist, dateExist } = require('../middlewares/detailsExist')
const { sendmail, mailGenerator } = require('../middlewares/mailer')
const jwt = require('jsonwebtoken')


// vendors register
const adminRegister = async (req, res) => {
    try{
        
        email = req.body.email;

        var details = await onlyMailExist(email);
        
        if(details === false){

            password = await passwordHash(req.body.password)

            let info = {
                email: email,
                password: password
            }

            const admin = await new Admin(info).save()
            if(admin !== null){

                const token = jwt.sign(
                    { id: admin._id },
                    process.env.SESSION_SECRET,
                    {
                        expiresIn: "2h",
                    }
                );

                res.json({ message: 'account created', data: admin, token: token })
            }else{
                res.json({ message: 'error creating account' })
            }
        }else{
            res.json({message: "account with email address already exists"});
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// admin login
const adminlogin = async (req, res) => {
    try{

        email = req.body.email;
        
        password = await passwordHash(req.body.password)


        const admin = await Admin.findOne({ email: req.body.email }); 
        if (admin) { 
            //check if password matches and create token
            const result = password === admin.password; 
            if (result) {

                const token = await jwt.sign(
                    { id: admin._id },
                    process.env.SESSION_SECRET,
                    {
                    expiresIn: "2h",
                    }
                );

                res.json({ message: 'login successful', data: admin, token: token }) 

            }else{ 
                res.status(400).json({ error: "password doesn't match" }); 
            } 
        }else{ 
            res.status(400).json({ error: "User doesn't exist" }); 
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// vendors forgot password
const adminForgot = async (req, res) => {
    try{
        email = req.body.email;  

        var details = await onlyMailExist(email);
        
        if(details === true){  

            var emailSender = {
                body: {
                    name: 'Hardware Mall',
                    intro: 'We got a request to reset your  password, if this was you, click the link below to reset password or ignore and nothing will happen to your account.',

                    action: {
                        instructions: 'To get started, please click here:',
                        button: {
                            color: '#22BC66',
                            text: 'Recover Password',
                            link: 'https://www.hardwaremall.com/passwordreset?email='+email
                        }
                    },
                    
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.\n\n Team Hardware Mall.'
                }
            };
            
            // Generate an HTML email with the provided contents
            let emailBody = mailGenerator.generate(emailSender);
            // send mail
            const sent = sendmail(email, 'Password Recovery', emailBody);
            if(sent == true){
                res.status(200).json({ message: 'check your mail', data:email })
            }else{
                res.status(200).json({ message: 'error sending mail' })
            }

        }else{
            res.json({ message: 'email address does not exist' })
        }
    }catch(error){
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// vendors rest password
const adminReset = async (req, res) => {
    try{
        
        email = req.body.email;
        password = passwordHash(req.body.password);

        const admin = await Admin.update({ password:password }, { where: {email: email }})

        if(admin !== null){
            res.json({ message: "password changed", data: email })
        }else{
            res.json({ message: "error reseting password", data: email }) 
        }

    }catch(error){
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// add evaluation
const applyEval = async (req, res) => {
    try{
        let info = {
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            bookDate: req.body.date
        }

        var details = await dateExist(req.body.date);
        
        if(details === false){

            const evaluation = await new Evaluation(info).save()
            if(evaluation !== null){
                res.json({ message: 'evaluation uploaded' })
            }else{
                res.json({ message: 'error uploading evaluation' })
            }
        }else{
            res.json({ message: 'date taken' })
        }
       
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// suscribe for newsletters
const suscribe = async (req, res) => {
    try{
        let info = {
            email: req.body.email
        }

        const sus = await new Newsletter(info).save()
        if(sus !== null){
            res.json({ message: 'suscribed' })
        }else{
            res.json({ message: 'error suscribing to newsletters' })
        }
       
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch evaluations
const getEvalDate = async (req, res) => {
    try{

        let response = await Stats.Evaluation().sort({ createdAt: -1 })
        if(response !== null){
            const compressedData = await compressSent(response);
            res.json({ data: compressedData })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}







module.exports = {
    adminlogin,
    adminRegister,
    adminForgot,
    adminReset,
    applyEval,
    getEvalDate,
    suscribe
}