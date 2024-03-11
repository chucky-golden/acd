const Team = require('../models/teams')
const Logo = require('../models/logos')
const cloudinary = require('../middlewares/cloudinary')
const streamifier = require('streamifier')
const { compressSent } = require('../middlewares/compressdata')


// fetch team member
const getTeam = async (req, res) => {
    try{

        let team = await Team.find().sort({ createdAt: -1 })
        if(team !== null){
            const compressedData = await compressSent(team);
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


// fetch team member by id
const getTeamById = async (req, res) => {
    try{

        let teamid = req.params.id
        let team = await Team.findOne({ _id: teamid }) 
        if(team !== null){
            res.json({ data: team })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// delete team member by id
const deleteTeamById = async (req, res) => {
    try{

        let teamid = req.params.id
        let team = await Team.findByIdAndDelete({ _id: teamid }) 
        if(team !== null){
            res.json({ message: 'team member deleted' })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// create team member
const addTeam = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        if (req.file == undefined) {
            return res.json({ message: 'please upload an image' })
        }

        // Convert the buffer to a readable stream
        const bufferStream = streamifier.createReadStream(req.file.buffer);
        // Create a stream from the buffer
        const stream = cloudinary.uploader.upload_stream(async (error, result) => {
            if (error) {
                console.error(error);
                return res.json({ message: 'Error uploading team member' });
            } else {

                let info = {
                    img: result.secure_url,
                    cloudinaryid: result.public_id,
                    name: req.body.name,
                    role: req.body.role,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter,
                };

                const team = await new Team(info).save();
                if (team !== null) {
                    return res.json({ message: 'team member added' });
                } else {
                    return res.json({ message: 'Error adding team member' });
                }
            }
        });

        // Pipe the buffer stream to the Cloudinary stream
        bufferStream.pipe(stream);
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// editing stats
const editTeam = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        const teamid = req.body.teamid

        const check = await Team.findOne({ _id: teamid }) 
        if (check !== null) {
                
            if (req.file == undefined) {
                
                const team = await Team.updateOne({ _id: teamid }, 
                    {
                        $set:{
                            name: req.body.name,
                            role: req.body.role,
                            comment: req.body.comment,
                            facebook: req.body.facebook,
                            instagram: req.body.instagram,
                            twitter: req.body.twitter,
                        }
                    }
                )
                if(team !== null){
                    res.json({ message: 'team member updated' })
                }else{
                    res.json({ message: 'error updating team member' })
                }
                    
            }else{

                // Convert the buffer to a readable stream
                const bufferStream = streamifier.createReadStream(req.file.buffer);
                // Create a stream from the buffer
                const stream = cloudinary.uploader.upload_stream(async (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.json({ message: 'Error uploading team member' });
                    } else {

                        const team = await Team.updateOne({ _id: teamid }, 
                            {
                                $set:{

                                    img: result.secure_url,
                                    cloudinaryid: result.public_id,
                                    name: req.body.name,
                                    role: req.body.role,
                                    facebook: req.body.facebook,
                                    instagram: req.body.instagram,
                                    twitter: req.body.twitter,
                                }
                            }
                        )
                        if(team !== null){
                            res.json({ message: 'team updated' })
                        }else{
                            res.json({ message: 'error updating team' })
                        }
                    }
                });

                // Pipe the buffer stream to the Cloudinary stream
                bufferStream.pipe(stream);

            }
            
        }else{
            res.json({ message: 'invalid id' })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}









// fetch team member
const getLogo = async (req, res) => {
    try{

        let logo = await Logo.find().sort({ createdAt: -1 })
        if(logo !== null){
            const compressedData = await compressSent(logo);
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


// fetch team member by id
const getLogoById = async (req, res) => {
    try{

        let logoid = req.params.id
        let logo = await Logo.findOne({ _id: logoid }) 
        if(logo !== null){
            res.json({ data: logo })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// delete logo member by id
const deleteLogoById = async (req, res) => {
    try{

        let logoid = req.params.id
        let logo = await Logo.findByIdAndDelete({ _id: logoid }) 
        if(logo !== null){
            res.json({ message: 'logo member deleted' })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// create team member
const addLogo = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        if (req.file == undefined) {
            return res.json({ message: 'please upload an image' })
        }

        // Convert the buffer to a readable stream
        const bufferStream = streamifier.createReadStream(req.file.buffer);
        // Create a stream from the buffer
        const stream = cloudinary.uploader.upload_stream(async (error, result) => {
            if (error) {
                console.error(error);
                return res.json({ message: 'Error uploading logo' });
            } else {

                let info = {
                    img: result.secure_url,
                    cloudinaryid: result.public_id,
                };

                const logo = await new Logo(info).save();
                if (logo !== null) {
                    return res.json({ message: 'logo added' });
                } else {
                    return res.json({ message: 'Error adding logo' });
                }
            }
        });

        // Pipe the buffer stream to the Cloudinary stream
        bufferStream.pipe(stream);
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}







module.exports = {
    getTeam,
    getTeamById,
    addTeam,
    editTeam,
    deleteTeamById,
    addLogo,
    deleteLogoById,
    getLogoById,
    getLogo
}