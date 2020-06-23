const Promo = require('../models/promo.model')
const fs = require('fs')

//Admin

module.exports.createPromo = async (req, res) => {

    const promo = new Promo({
        file: `uploads/${req.file.filename}`,
        created_at: new Date(),
    })

    try {
        await promo.save()
        res.status(201).json(promo)
    } catch (e) {

        res.status(500).json(e)
    }
}

module.exports.deletePromo = async (req, res) => {

    try {
        await Promo.deleteOne( { _id : req.params.id } )

        try {
            fs.unlinkSync('./static/' + req.body.path)
        } catch(err) {
            console.error(err)
        }
        res.json({message: 'Промо удалено'})
    } catch (e) {
        res.status(500).json(e)
    }

}

module.exports.getPromo = async (req, res) => {

    const promo = await Promo.find().sort({created_at: -1});
    res.json(promo)
}

//Base

module.exports.getAllIndex = async (req, res) => {

    const promos = await Promo.find().sort({created_at: -1});

    res.json(promos)

}