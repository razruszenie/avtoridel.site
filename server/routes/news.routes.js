const passport = require('passport')
const {Router} = require('express')
const upload_img = require('../middleware/upload-image')
const ctr = require('../controllers/news.controller')
const router = Router()

// Admin
// api/news/${text}

router.post(
    '/admin/promo',
    passport.authenticate('JWT', {session: false}),
    upload_img.single('file'),
    ctr.createPromo
)

router.delete(
    '/admin/promo/:id',
    passport.authenticate('JWT', {session: false}),
    ctr.deletePromo
)

router.get(
    '/promo',
    passport.authenticate('JWT', {session: false}),
    ctr.getPromo
)


// Base
// api/news/${text}

router.get(
    '/', ctr.getAllIndex
)

module.exports = router