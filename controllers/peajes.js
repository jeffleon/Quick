var fetchpeajes = require('../service/peajes')
var Peaje = require('../models/peajes')

exports.peajes_get = async(req, res, error)=>{
    var peajes = {peajes: await Peaje.peajes()}
    res.send({data: peajes});
}

exports.create_post = async (req, res) =>{
    var data = await fetchpeajes()
    if (data){
        data.peajes.forEach(element => {
            var peaje_nuevo = new Peaje()
            peaje_nuevo.Nombre = element["Nombre/Localizacion"]
            peaje_nuevo.Coordenadas = element["Coordenadas"]
            peaje_nuevo.Operaddor = element["Operador"]
            peaje_nuevo.id = element["id"]
            peaje_nuevo.NuevaTarifa = element["Nueva Tarifa"]
            Peaje.crear(peaje_nuevo);
        });
        res.redirect('/peajes');
    }
}