const router = require('express').Router()
const adminController = require('../controllers/admincontroller')
const datasController = require('../controllers/datacontroller')
const teamController = require('../controllers/teamcontroller')
const auth = require("../middlewares/auth")
const multer = require("multer")

let storage = multer.memoryStorage()
let upload = multer({storage: storage})

router.get('/newsletters', adminController.newsletters)


router.get('/subcategory', adminController.adminGetSubCategory)
router.get('/subcategory/:id', adminController.adminGetSubCategoryById)
router.post('/addsubcategory', auth, adminController.adminSubCategory)
router.post('/editsubcategory', auth, adminController.adminSubEditCat)


router.get('/category', adminController.adminGetCategory)
router.get('/category/:id', adminController.adminGetCategoryById)
router.post('/addcategory', auth, adminController.adminCategory)
router.post('/editcategory', auth, adminController.adminEditCat)


router.get('/blog', adminController.adminGetBlog)
router.get('/blog/:id', adminController.adminGetBlogById)
router.post('/addblog', auth, adminController.adminBlog)
router.post('/editblog', auth, adminController.adminEditBlog)



router.get('/team', teamController.getTeam)
router.get('/team/:id', teamController.getTeamById)
router.get('/deleteteam/:id', teamController.deleteTeamById)
router.post('/addteam', auth, upload.single("file"), teamController.addTeam)
router.post('/editteam', auth, upload.single("file"), teamController.editTeam)


router.get('/testimonial', teamController.getTestimonial)
router.get('/testimonial/:id', teamController.getTestimonialById)
router.get('/deletetestimonial/:id', teamController.deleteTestimonialById)
router.post('/addtestimonial', auth, upload.single("file"), teamController.addTestimonial)
router.post('/edittestimonial', auth, upload.single("file"), teamController.editTestimonial)


router.get('/logo', teamController.getLogo)
router.get('/logo/:id', teamController.getLogoById)
router.get('/deletelogo/:id', teamController.deleteLogoById)
router.post('/addlogo', auth, upload.single("file"), teamController.addLogo)


router.get('/getstats', datasController.adminGetAllStats)
router.get('/getstats/:id', datasController.adminGetStatsById)
router.get('/getfirststats', datasController.adminGetFirstStat)
router.get('/deletestats/:id', datasController.adminDeleteStats)
router.post('/addstats', auth, datasController.adminAddStats)
router.post('/editstats', auth, datasController.adminEditStats)



module.exports = router