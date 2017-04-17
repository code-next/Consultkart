const mongoose   = require('mongoose');
const plmongoose = require('passport-local-mongoose');



const clientSchema = new mongoose.Schema ({
    username : String,
    first    : String,
    last     : String,
    phone    : String,
    country  : String,
    state    : String,
    city     : String,
    cname    : String,
    ctype    : String,
    desc     : String,
    image    : String

});

clientSchema.plugin(plmongoose);
module.exports = mongoose.model("client",clientSchema);
