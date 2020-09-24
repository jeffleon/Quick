const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeajeSchema = new Schema({
    Nombre: String,
    Coordenadas: [String],
    Operador:String,
//    Sentido: Number,
    NuevaTarifa: mongoose.SchemaTypes.Mixed,
    Fecha_de_modificacion: { type: Date, default: Date.now },
//    Municipio: String,
//    Departamento: String,
    id: Number
});

PeajeSchema.statics.crear = function(peaje) {
    this.create(peaje, (error)=>{console.log(error)});
}

PeajeSchema.statics.eliminar = function(id) {
    this.findByIdAndDelete(id, (error)=>{console.log(error)})
}

PeajeSchema.statics.buscarxid = async function(id, cb) {
    console.log("i enter tu the function", id)
    var peaje = await this.findById(id, cb)
    console.log(peaje);
    return peaje
}
PeajeSchema.statics.peajes = async function(cb) {
    var peajes = await this.find()
    return peajes
}

PeajeSchema.statics.actualizar = function(id, actualizar){
    this.findByIdAndUpdate(id, actualizar)
}  

module.exports = mongoose.model('Peaje', PeajeSchema)