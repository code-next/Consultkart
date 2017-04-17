const mongoose   = require('mongoose');




const jobSchema = new mongoose.Schema ({
    title:String,
    desc:String,
    sector:String,
    type:String,
    postedon:Date,
    startdate:Date,
    enddate:Date,
    skill:String,
    exp:String,
    owner:String,
    consultant:String,
    status:String,
    constatus:String,
});

module.exports = mongoose.model("job",jobSchema);