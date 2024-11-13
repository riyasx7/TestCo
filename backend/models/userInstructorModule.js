const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
    {

    }
);

const userInstructorModule = mongoose.model("Instructor", instructorSchema);
console.log("product model sent to mongo");
module.exports = userInstructorModule;
