const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const app = express();
const items=require('./app/utiles/items')
const users=require('./app/utiles/users')
const productRouter=require('./app/routes/item.route')
const userRouter=require('./app/routes/user.route')
const userCartRouter=require('./app/routes/userCart.route')

//define express
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongoDB connect
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  app.get("/", (req, res) => {
  res.json({ message: "electra" });
});

//routes
require("./app/routes/user.route")(app);
require("./app/routes/userCart.route")(app);
require("./app/routes/item.route")(app);

//connect to localhost
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
  //insert products to DB
  db.Item.find({}).then(res=>{
    if(res.length==0){
      db.Item.insertMany(items).then(()=>{
      console.log("Items inserted")  // Success
    }).catch((error)=>{
      console.log(error)      // Failure
  });
    }
  })

  //insert 2 users to DB
  db.User.find({}).then(res=>{
    if (res.length==0){
      db.users.insertMany(users).then(()=>{
        console.log('Users inserted') // Success
      }).catch((error)=>{
        console.log(error) // Failure
      })
    }
  })
});
