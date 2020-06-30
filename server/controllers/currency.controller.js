const Currency = require('../models/currency.model')

//Admin
module.exports.get = async (req, res) => {
    try {

        const currencies = await Currency.find({})

        let currency = {};
        if(currencies && currencies.length !== 0){
            currency = currencies[0];
        }
        res.json(currency)

    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.update = async (req, res) => {

    const $set = {
        USD: parseFloat(req.body.USD),
        EUR: parseFloat(req.body.EUR),
        RUB: parseFloat(req.body.RUB),
        BYN: parseFloat(req.body.BYN),
    }

    try {
        await Currency.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true})

        res.status(201).json({"message": "Currency updated"})
    } catch (e) {
        res.status(500).json(e)
    }
}