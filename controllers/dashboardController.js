const Product = require('../models/products'); 

const mongoose = require('mongoose'); 

// @method: GET
// @route: '/dashboard'
// @desc: All products in ascending order of posting

exports.dashboard = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sort: { postedAt: -1 }
            }, 
            {
                $project: {
                    seller: 1, 
                    name: { $substr: ['$name', 0, 30 ] }, 
                    description: { $substr: ['$description', 0, 100] }, 
                    price: 1, 
                    postedAt: 1, 
                    updatedAt: 1
                }
            }
        ])
        .exec();
        res.send({
            products: products
        }) 
    } catch (error) {
        res.send('dashboard error')
        console.log(error); 
    }
}; 

// @method: GET
// @route: '/dashboard/prod/:id'
// @desc: send a single product

exports.dashboardViewProduct = async (req, res) => {
    const product = await Product.findById(req.params.id); 
    
    if (product) {
        res.status(200).send("ok"); 
    } else {
        res.status(404); 
        res.send("Product not found"); 
    }
}

// @method: PUT
// @route: '/dashboard/prod/:id'
// @desc: update a product

exports.dashboardUpdateProduct = async (req, res) => {
    try {
        await Product.findOneAndUpdate(
            { _id: req.params.id }, 
            { 
                seller: req.body.seller,
                name: req.body.name, 
                description: req.body.description, 
                price: req.body.price,
                updatedAt: Date.now()
            }
        );  
        res.status(200).send("Ok"); 
    } catch (error) {
        console.log(error);
    } 
}; 


// @method: DELETE
// @route: '/dashboard/prod-delete/:id'
// @desc: Delete a particular product

exports.dashboardDeleteProduct = async (req, res) =>{
    try {
        await Product.deleteOne({
            _id: req.params.id
        });
        res.redirect('/dashboard');
    } catch (error) {
        res.send('product not found'); 
    }
};

// @method: POST
// @route: '/dashboard/add'
// @desc: Add a new product

exports.dashboardAddProduct = async (req, res) =>{
    try {
        await Product.create(req.body); 
        res.status(200).send("Ok"); 
    } catch (error) {
        console.log(error);
    }
};

// @method: POST
// @route: '/dashboard/search'
// @desc: Search for a product

exports.dashboardSearch = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm; 
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, ""); 

        const searchResults = await Product.find({
            $or: [
                { name: { $regex: new RegExp(searchNoSpecialChars, 'i')}}, 
                { description: { $regex: new RegExp(searchNoSpecialChars, 'i')}}
                // { variant: { $elemMatch: { desc: { $regex: new RegExp(searchNoSpecialChars, 'i')}}}}
            ]
        }); 
        res.send({list: searchResults}); 
    } catch (error) {
        console.log(error); 
    }
}