const app = require("./app");
const mongoose = require('mongoose');

const DB = "mongodb://root:battle123root@127.0.0.1:27017/battleship?authSource=admin";
mongoose.set('strictQuery', false);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(res => console.log("DB connection is successful"));

const port = 3000;
app.listen(port, ()=> {
    console.log(`App is listening at ${port}`);
});
