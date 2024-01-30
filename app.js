require("dotenv").config(); 

const express = require('express'); 
const connectDB = require('./config/db'); 
const methodOverride = require('method-override'); 
const MongoStore = require('connect-mongo'); 

const app = express(); 
const PORT = 5000 || process.env.PORT; 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(methodOverride("_method")); // Allows us PUT DELETE
connectDB(); 

// Routes 
app.get('/', (req, res) => {
    res.send('hellow'); 
})
app.use("/", require("./routes/dashboard")); 

app.use('*', (req, res) => {
    res.status(404); 
    res.send('Page Not found'); 
})

module.exports = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}....`); 
})