var fetchpeajes = require('../service/peajes')
var Peaje = require('../models/peajes')

exports.peajes_get = async(req, res, error)=>{
    var peajes = {peajes: await Peaje.peajes()}
    res.status(200).send({data: peajes});
}

exports.create_post = async (req, res) =>{
    var data = await fetchpeajes()
    if (data){
        data.peajes.forEach(element => {
            var peaje_nuevo = new Peaje()
            peaje_nuevo.Nombre = element["Nombre/Localizacion"]
            peaje_nuevo.Coordenadas = element["Coordenadas"]
            peaje_nuevo.Operador = element["Operador"]
            peaje_nuevo.id = element["id"]
            peaje_nuevo.NuevaTarifa = element["Nueva Tarifa"]
            Peaje.crear(peaje_nuevo);
        });
        res.status(301).redirect('/peajes');
    }
}

exports.actualizar = async (req, res) =>{
    try {
        var peajeActualizado = await Peaje.actualizar(req.params.id, req.body)
        console.log(peajeActualizado);
        res.status(200).send(peajeActualizado)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
  }
}