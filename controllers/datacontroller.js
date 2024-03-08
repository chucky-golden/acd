const Stats = require('../models/stats')



// upload evaluation
const adminAddStats = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        let info = {
            name: req.body.name,
            location: req.body.location,
            category: req.body.category,
            compScore: req.body.compScore,
            quota: req.body.quota,
            rating: req.body.rating,
            spost: req.body.spost,
            camera: req.body.camera,
            point: req.body.point,
            emergency: req.body.emergency,
            srating: req.body.srating,
            building: req.body.building,
            entrance: req.body.entrance,
            room: req.body.room,
            paths: req.body.paths,
            gtoilet: req.body.gtoilet,
            atoilet: req.body.atoilet,
            lifts: req.body.lifts,
        }

        const evaluation = await new Stats(info).save()
        if(evaluation !== null){
            res.json({ message: 'evaluation uploaded' })
        }else{
            res.json({ message: 'error uploading evaluation' })
        }
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// fetch stats
const adminGetAllStats = async (req, res) => {
    try{

        let response = await Stats.find().sort({ createdAt: -1 })
        if(response !== null){
            res.json({ data: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch stats
const adminGetStatsById = async (req, res) => {
    try{

        let statid = req.params.id
        let response = await Stats.findOne({ _id: statid })
        if(response !== null){
            res.json({ data: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// editing stats
const adminEditStats = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        const check = await Stats.findOne({ _id: req.body.statid }) 
        if (check !== null) {
                
            const stats = await Stats.updateOne({ _id: statid }, 
                {
                    $set:{
                        name: req.body.name,
                        location: req.body.location,
                        category: req.body.category,
                        compScore: req.body.compScore,
                        quota: req.body.quota,
                        rating: req.body.rating,
                        spost: req.body.spost,
                        camera: req.body.camera,
                        point: req.body.point,
                        emergency: req.body.emergency,
                        srating: req.body.srating,
                        building: req.body.building,
                        entrance: req.body.entrance,
                        room: req.body.room,
                        paths: req.body.paths,
                        gtoilet: req.body.gtoilet,
                        atoilet: req.body.atoilet,
                        lifts: req.body.lifts,
                    }
                }
            )
            if(stats !== null){
                res.json({ message: 'organization updated' })
            }else{
                res.json({ message: 'error updating organization' })
            }
            
        }else{
            res.json({ message: 'invalid id' })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




module.exports = {
    adminAddStats,
    adminGetAllStats,
    adminGetStatsById,
    adminEditStats
}