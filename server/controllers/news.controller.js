const Promo = require('../models/promo.model')
const Pagination = require('../middleware/pagination')
const fs = require('fs')

//Admin
module.exports.create = async (req, res) => {
    const news = new News({
        status: 0,
        type: req.body.type,
        title: req.body.title,
        preview: req.body.preview,
        text: req.body.text,
        file: `uploads/${req.file.filename}`,
        views: 0,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        orders: []
    })

    try {
        await news.save()
        res.status(201).json(news)
    } catch (e) {

        res.status(500).json(e)
    }
}

module.exports.getAll = async (req, res) => {
    try {
        let page = req.query.page;

        delete req.query['page'];

        let options = await Pagination(page)

        options.sort = {created_at: -1}

        const news = await News.paginate(req.query, options)

        res.json(news)

    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        res.json(news)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.update = async (req, res) => {

    let $set = {
        type: req.body.type,
        title: req.body.title,
        preview: req.body.preview,
        text: req.body.text,
        updated_at: new Date()
    }

    try {
        $set.file = `uploads/${req.file.filename}`
        $set.status = 1
    } catch (e) {

    }

    try {
        const news = await News.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true})
        res.json(news)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.addOrder = async (req, res) => {

    let $push = {
        orders: []
    }

    const obj = {
        name: req.body.name,
        phone: req.body.phone,
        about: req.body.about,
        file: `uploads/${req.file.filename}`,
        created_at: new Date()
    }

    $push.orders.push(obj)

    try {
        const news = await News.findOneAndUpdate({
            _id: req.params.id
        }, {$push}, {new: true})

        res.json(news)
    } catch (e) {
        res.status(500).json(e)
    }
}


module.exports.deleteImage = async (req, res) => {
    const $set = {
        status: 0,
        file: '',
        updated_at: new Date()
    }

    const path = 'static/' + req.body.file
    try {

        fs.unlink(path, (err) => {
            if (err) {
                console.log(err);
            }
        });

        const news = await News.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true})
        res.json(news)
    } catch (e) {
        res.status(500).json(e)
    }
}

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

module.exports.getByIdIndex = async (req, res) => {
    try {
        const news = await News.findById(req.params.id).select('_id created_at ' +
            'file preview status text title type views');
        res.json(news)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.addView = async (req, res) => {

    let views = parseInt(req.body.views)
    const $set = {
        views: ++views
    }
    try {
        await News.findOneAndUpdate({
            _id: req.params.id,
            status: 1
        }, {$set})
        res.status(204).json('View add')
    } catch (e) {
        res.status(500).json(e)
    }
}