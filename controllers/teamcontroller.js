const Team = require('../models/teams')
const Testimonial = require('../models/testimonials')
const Logo = require('../models/logos')
const Partner = require('../models/partner')
const cloudinary = require('../middlewares/cloudinary')
const streamifier = require('streamifier')
const { compressSent } = require('../middlewares/compressdata')


// fetch Testimonial
const getTestimonial = async (req, res) => {
    try{

        let testimonial = await Testimonial.find().sort({ createdAt: -1 })
        if(testimonial !== null){
            const compressedData = await compressSent(testimonial);
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


// fetch testimonial by id
const getTestimonialById = async (req, res) => {
    try{

        let testimonialid = req.params.id
        let testimonial = await Testimonial.findOne({ _id: testimonialid }) 
        if(testimonial !== null){
            res.json({ data: testimonial })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// delete testimonial by id
const deleteTestimonialById = async (req, res) => {
    try{

        let testimonialid = req.params.id
        let testimonial = await Testimonial.findByIdAndDelete({ _id: testimonialid }) 
        if(testimonial !== null){
            res.json({ message: 'testimonial deleted' })
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
const addTestimonial = async (req, res) => {
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
                return res.json({ message: 'Error uploading testimonial' });
            } else {

                let info = {
                    img: result.secure_url,
                    cloudinaryid: result.public_id,
                    fullname: req.body.fullname,
                    label: req.body.label,
                    message: req.body.message,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter,
                };

                const testimonial = await new Testimonial(info).save();
                if (testimonial !== null) {
                    return res.json({ message: 'testimonial added' });
                } else {
                    return res.json({ message: 'Error adding testimonial' });
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



// editing testimonial
const editTestimonial = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        const testimonialid = req.body.testimonialid

        const check = await Testimonial.findOne({ _id: testimonialid }) 
        if (check !== null) {
                
            if (req.file == undefined) {
                
                const testimonial = await Testimonial.updateOne({ _id: testimonialid }, 
                    {
                        $set:{
                            fullname: req.body.fullname,
                            label: req.body.label,
                            message: req.body.message,
                            facebook: req.body.facebook,
                            instagram: req.body.instagram,
                            twitter: req.body.twitter,
                        }
                    }
                )
                if(testimonial !== null){
                    res.json({ message: 'testimonial updated' })
                }else{
                    res.json({ message: 'error updating testimonial' })
                }
                    
            }else{

                // Convert the buffer to a readable stream
                const bufferStream = streamifier.createReadStream(req.file.buffer);
                // Create a stream from the buffer
                const stream = cloudinary.uploader.upload_stream(async (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.json({ message: 'Error uploading testimonial pic' });
                    } else {

                        const testimonial = await Testimonial.updateOne({ _id: testimonialid }, 
                            {
                                $set:{

                                    img: result.secure_url,
                                    cloudinaryid: result.public_id,
                                    fullname: req.body.fullname,
                                    label: req.body.label,
                                    message: req.body.message,
                                    facebook: req.body.facebook,
                                    instagram: req.body.instagram,
                                    twitter: req.body.twitter,
                                }
                            }
                        )
                        if(testimonial !== null){
                            res.json({ message: 'testimonial updated' })
                        }else{
                            res.json({ message: 'error updating testimonial' })
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
                    comment: req.body.comment,
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




// editing team
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
                                    comment: req.body.comment,
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





// fetch team member
const getPartner = async (req, res) => {
    try{

        let logo = await Partner.find().sort({ createdAt: -1 })
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
const getPartnerById = async (req, res) => {
    try{

        let logoid = req.params.id
        let logo = await Partner.findOne({ _id: logoid }) 
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
const deletePartnerById = async (req, res) => {
    try{

        let logoid = req.params.id
        let logo = await Partner.findByIdAndDelete({ _id: logoid }) 
        if(logo !== null){
            res.json({ message: 'Partner member deleted' })
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
const addPartner = async (req, res) => {
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

                const logo = await new Partner(info).save();
                if (logo !== null) {
                    return res.json({ message: 'Partner added' });
                } else {
                    return res.json({ message: 'Error adding Partner' });
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
    getLogo,
    getTestimonial,
    getTestimonialById,
    deleteTestimonialById,
    addTestimonial,
    editTestimonial,
    addPartner,
    deletePartnerById,
    getPartnerById,
    getPartner
}