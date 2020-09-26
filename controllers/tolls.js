var fetchpeajes = require('../service/peajes')
var Toll = require('../models/tolls')

exports.get_tolls = async(req, res, error)=>{
    var tolls = {tolls: await Toll.tolls()}
    res.status(200).send({data: tolls});
}

exports.create_post_scrapper = async (req, res) =>{
    var data = await fetchpeajes()
    try{
        if (data){
            data.peajes.forEach(element => {
                var new_toll = new Toll()
                new_toll.name = element["Nombre/Localizacion"]
                new_toll.coordenates = element["Coordenadas"]
                new_toll.operator = element["Operador"]
                new_toll.id = element["id"]
                new_toll.toll_cost = element["Nueva Tarifa"]
                Toll.create(new_toll);
            });
            res.status(301).redirect('/tolls');
        }
    } catch(error) {
        res.status(500).send(error)
    }
}

exports.get_toll_id = async (req, res) => {
    try{
        var toll = await Toll.find_toll_id(req.params.id)
        if(!toll) { 
            res.status(404).send(`we can find the toll with id ${req.params.id}`);
        } else{
            res.status(200).send(toll);
        }
    } catch(error) {
        res.status(500).send(error)
    }
}
exports.create_post = async (req, res) =>{
    try{
        var new_toll = new Toll()
        new_toll.coordenates = req.body.coordenates
        new_toll.direction = req.body.direction
        new_toll.total_cost = req.body.toll_cost
        new_toll.state = req.body.state
        new_toll.department = req.body.department
        new_toll.operator = req.body.operator
        new_toll.name = req.body.name
        Toll.create(new_toll)
        res.status(200).send(new_toll);
    } catch(error) {
        res.status(500).send(error)
    }  
}
exports.delete = async(req, res) => {
    try{
        await Toll.delete_toll(req.params.id)
        res.status(200).send(`${req.params.id} toll deleted`)
    } catch(error) {
        res.status(500).send(error)
    }
}
exports.update = async (req, res) =>{
    try {
        var toll = Toll.find_toll_id(req.params.id)
        if(typeof(toll) !== Object) { 
            res.status(404).send(`we can find the toll with id ${req.params.id}`) 
        }else{
            var updatedtoll = await Toll.update_toll(req.params.id, req.body);
            res.status(200).send(updatedtoll);
        }
    } catch(error) {
        res.status(500).send(error)
   }
}