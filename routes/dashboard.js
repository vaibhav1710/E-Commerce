const express = require('express'); 
const router = express.Router(); 
const dashboardController = require('../controllers/dashboardController'); 

router.get('/dashboard', dashboardController.dashboard); 
router.get('/dashboard/prod/:id', dashboardController.dashboardViewProduct);
router.put('/dashboard/prod/:id', dashboardController.dashboardUpdateProduct);
router.delete('/dashboard/prod-delete/:id', dashboardController.dashboardDeleteProduct);
router.post('/dashboard/add', dashboardController.dashboardAddProduct);
router.post('/dashboard/search', dashboardController.dashboardSearch);

module.exports = router;  