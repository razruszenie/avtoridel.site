const Order = require('../models/order.model')
const Pagination = require('../middleware/pagination')
const axios = require('axios');

//Admin
module.exports.getAll = async (req, res) => {
    try {

        let page = req.query.page;

        let options = await Pagination(page)

        options.sort = {created_at: -1}

        const orders = await Order.paginate({}, options)

        res.json(orders)

    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.update = async (req, res) => {
    const $set = {
        status: 1,
        viewed_at: new Date()
    }
    try {
        const order = await Order.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true})
        res.json(order)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getActiveCount = async (req, res) => {
    try {
        const orders = await Order.find({status: 0})

        const length = orders.length;

        res.json({length: length})

    } catch (e) {
        res.status(500).json(e)
    }
}


//Base
module.exports.create = async (req, res) => {
    const order = new Order({
        status: 0,
        part: req.body.part,
        name: req.body.name,
        phone: req.body.prefix + req.body.phone,
        more: req.body.more,
        created_at: new Date(),
        viewed_at: null
    })

    try {
        await order.save()

        let more = req.body.more
        if(!more){
            more = '-'
        }

        const msg = encodeURIComponent('Заявка на '
            + req.body.part + '. Имя: ' + req.body.name + ', телефон: ' +
            req.body.prefix + req.body.phone + ', дополнительно: ' + more)

        axios.get('https://alarmerbot.ru/?key=37752f-f13a0c-48e6ec&message=' + msg)
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            });

        res.status(201).json(order)
    } catch (e) {

        res.status(500).json(e)
    }
}