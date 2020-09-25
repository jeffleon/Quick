const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeajeSchema = new Schema({
    Nombre: String,
    Coordenadas: {lat: Number, lon: Number},
    Operador:String,
    Sentido: { type: String, default: "" },
    NuevaTarifa: mongoose.SchemaTypes.Mixed,
    Fecha_de_modificacion: { type: Date, default: Date.now },
    Municipio: { type: String, default: "" },
    Departamento: { type: String, default: "" },
    id: Number
});

PeajeSchema.statics.crear = function(peaje) {
    this.create(peaje, (error)=>{console.log(error)});
}

PeajeSchema.statics.eliminar = function(id) {
    this.findByIdAndDelete(id, (error)=>{console.log(error)})
}

PeajeSchema.statics.buscarxid = async function(id, cb) {
    var peaje = await this.findById(id, cb)
    return peaje
}
PeajeSchema.statics.peajes = async function(cb) {
    var peajes = await this.find()
    return peajes
}

PeajeSchema.statics.actualizar = async function(id, actualizar){
    var peaje = await this.findByIdAndUpdate(id, actualizar)
    console.log("esta es la respuesta del modelo", peaje)
    return peaje
}  

module.exports = mongoose.model('Peaje', PeajeSchema)