const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/currency.controller')
const router = Router()

// api/auth/admin/login

router.put(
    '/admin/:id',
    passport.authenticate('JWT', {session: false}),
    ctr.update
)

router.get(
    '/',
    ctr.get
)

module.exports = router