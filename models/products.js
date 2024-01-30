const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const ProductSchema = new Schema ({
    seller: {
        type: String, 
        required: true
    }, 
    name: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    price: { 
        type: Number, 
        required: true
    }, 
    postedAt: {
        type: Date, 
        default: Date.now(), 
    }, 
    updatedAt: {
        type: Date, 
        default: Date.now(), 
    }
}); 

module.exports = mongoose.model("Product", ProductSchema);