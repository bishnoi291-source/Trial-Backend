const mongo = require('mongodb');
const mongoclient = mongo.MongoClient;
const Mongo_URL = "mongodb+srv://trial:manish29@trial.ktraj12.mongodb.net/?appName=trial";
let _db;
const mongoconnect = (callback) => {
    mongoclient.connect(Mongo_URL).then((client) => {
        callback();
        _db = client.db("trial");
    })
    .catch((error) => {
        console.log(error);
    })
};

const getdb = () =>{
    if(!_db){
        throw new Error("Database Not Connected");
    }
    return _db;
};

module.exports = {mongoconnect,getdb};
