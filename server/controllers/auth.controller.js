const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({login: req.body.login})

    if(candidate){
        const isPassCorrect = bcrypt.compareSync(req.body.password, candidate.password)
        if(isPassCorrect){
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.JWT, {expiresIn: 600 * 60})

            res.status(200).json({token, "login": candidate.login, "role": candidate.role},)

        } else{
            res.status(401).json({message: 'Логин или пароль введены неправильно'})
        }

    }
    else {
        res.status(404).json({message: 'Логин или пароль введены неправильно'})
    }
}

// module.exports.createOne = async (req, res) => {
//
//     const salt = bcrypt.genSaltSync(10)
//     const user = new User({
//         login: 'avtoridel',
//         password: bcrypt.hashSync('9m0H4Tbt', salt)
//     })
//
//     try {
//         await user.save()
//         res.status(201).json({"message": "Client created"})
//     } catch (e) {
//
//         res.status(500).json(e)
//     }
// }

module.exports.getAll = async (req, res) => {
    try {

        const workers = await User.find({}).select({password: 0}).sort({created_at: -1})
        res.json(workers)

    } catch (e) {
        res.status(500).json(e)
    }
}