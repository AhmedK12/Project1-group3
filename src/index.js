const express = require("express");
const bodyParser = require("body-parser");
const route = require("./router/route.js");
const { default: mongoose} = require("mongoose");
const validator = require('./middleware/validators')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb+srv://ahmedkamaran893:likasA123@cluster0.svpuoqb.mongodb.net/kamaran7?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

  
    app.use("/", route);
    app.listen(process.env.PORT || 3000, function () {
      console.log("Express app running on port " + (process.env.PORT || 3000));
    });
  
 

