const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/auth.controller')
const router = Router()

// api/auth/admin/login
router.post('/admin/login', ctr.login)

// router.get(
//     '/admin/one',
//     ctr.createOne
// )

router.get(
    '/admin/all',
    passport.authenticate('JWT', {session: false}),
    ctr.getAll
)

module.exports = router