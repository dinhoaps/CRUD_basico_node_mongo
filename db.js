var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/sensorperigo")
            .then(conn => global.conn = conn.db("sensorperigo"))
            .catch(err => console.log(err));



function findAll(callback){  
    global.conn.collection("customers").find({}).toArray(callback);
}

//Função para inserir novo "customers" no banco de dados. 
function insert(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}

//função no db.js que retorna apenas um cliente, baseado em seu _id
var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
}

//função para atualizar um determinando usuário através do id
function update(id, customer, callback){
    global.conn.collection("customers").updateOne({_id:new ObjectId(id)}, customer, callback);
}

//função para deletar um determinado usuário através do id
function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne }

