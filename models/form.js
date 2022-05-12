const mongoose = require('mongoose')

const form = new mongoose.Schema({
    address : String,
    name : String,
    symbol : String
})

module.exports = mongoose.models.Form || mongoose.model("Form",form)