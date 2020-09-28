const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TollSchema = new Schema({
    name: String,
    coordenates: {lat: Number, lng: Number},
    operator: String,
    direction: { type: String, default: "" },
    toll_cost: mongoose.SchemaTypes.Mixed,
    date_modification: { type: Date, default: Date.now },
    department: { type: String, default: "" },
    id: Number
});

TollSchema.statics.create_toll = function(toll) {
    this.create(toll, (error)=>{console.log(error)});
}

TollSchema.statics.delete_toll = async function(id) {
    await this.findByIdAndDelete(id);
}

TollSchema.statics.find_toll_id = async function(id, cb) {
    var toll = await this.findById(id, cb);
    return toll;
}
TollSchema.statics.tolls = async function(cb) {
    var tolls = await this.find();
    return tolls;
}

TollSchema.statics.update_toll = async function(id, actualizar, cb){
    var toll = await this.findByIdAndUpdate(id, actualizar);
    return toll;
}  

module.exports = mongoose.model('Toll', TollSchema)