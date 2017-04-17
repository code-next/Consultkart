const mongoose   = require('mongoose');
const plmongoose = require('passport-local-mongoose');



const userSchema = new mongoose.Schema ({
    username : { type : String, required : true ,unique : true},
    password : String,
    utype    :String
});

userSchema.plugin(plmongoose);
module.exports = mongoose.model("user",userSchema);