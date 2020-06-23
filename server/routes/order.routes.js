const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/order.controller')
const router = Router()

// Admin
// api/order/${text}

router.get(
    '/admin/',
    passport.authenticate('JWT', {session: false}),
    ctr.getAll
)

router.put(
    '/admin/:id',
    passport.authenticate('JWT', {session: false}),
    ctr.update
)

router.get(
    '/admin/active',
    passport.authenticate('JWT', {session: false}),
    ctr.getActiveCount
)

// Base
// api/order/${text}

router.post(
    '/', ctr.create
)

module.exports = router