const Iman = require('../models/Imanes');
const imanController = {};

//controlador crear
imanController.create = async function(req, res, next) {
    let iman = new Iman();
    iman.forma = req.body.iman;
    iman.color = req.body.iman;
    iman.intensidad = req.body.iman;

    try{
        await iman.save();
        return res.status(200).json({"message":"iman agregado"});
    } catch (err) {
        return res.status(500).json({err: err, message:"datos malitos"});
    }
}

//controlador mostrar
imanController.index = async function(req, res, next) {
    let imanes = await Iman.find();
    return res.status(200).json(imanes);
}

//controlador busca4r
imanController.findIman = async function(req, res, next) {
    let {id} = req.params;
    let iman = await Iman.findById(id).catch(err => {
        return next(res)
    });
    return res.status(200).json(iman);
}

//controlador modificar 
imanController.update = async function(req, res, next) {
    let {id} = req.params;
    let iman = {
        forma = req.body.forma,
        color = req.body.color,
        intensidad = req.body.intensidad       
    }
    console.log(iman);
    try {
        await Iman.update({_id: id}, iman);
        return res.status(200).json({"message":"iman actuaslizado"});
    } catch (err) {
        return res.status(500).json({err: err, message:"datos malitos"});
    }
}

//controlador eliminr
imanController.delete = async function(req, res, next) {
    let {id} = req.params;
    await Iman.remove({_id: id});
    res.status(200).json({"message":"iman eliminado"});
}

module.exports = imanController;