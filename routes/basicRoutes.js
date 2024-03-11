const router = require('express').Router()
const basicController = require('../controllers/basiccontroller')


router.post('', basicController.adminlogin)
router.post('/register', basicController.adminRegister)
router.post('/forgot', basicController.adminForgot)
router.post('/reset', basicController.adminReset)
router.post('/evaluation', basicController.applyEval)
router.post('/suscribe', basicController.suscribe)

router.get('/getevaldate', basicController.getEvalDate)

router.get('/updatecount', basicController.updateCount)
router.get('/getcount', basicController.getCount)


module.exports = router