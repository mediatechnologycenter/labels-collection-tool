const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labellersSchema = new Schema({
        used: {type: Boolean, default: false}
    },
    {
        timestamps: true
    });

const labellers = mongoose.model("labellers", labellersSchema);
module.exports = labellers;
