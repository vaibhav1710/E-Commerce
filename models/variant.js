const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const VariantSchema = new Schema ({
    var_name: {
        type: String, 
        required: true
    }, 
    additional_price: {
        type: Number, 
        required: true
    }
}); 

module.exports = mongoose.model("Variant", VariantSchema);