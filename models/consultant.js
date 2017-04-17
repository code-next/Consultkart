const mongoose   = require('mongoose');
const plmongoose = require('passport-local-mongoose');



const ConSchema = new mongoose.Schema ({
    username : String,
    first    : String,
    last     : String,
    phone    : String,
    country  : String,
    state    : String,
    desc     : String,
    image    : String,
    resume   : String,
    avgrating: Number
});
ConSchema.plugin(plmongoose);
module.exports = mongoose.model("consultant",ConSchema);