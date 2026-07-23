const { default: mongoose } = require("mongoose");

const mallschema = new mongoose.Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    rating:{type:String,required:true},
    description:{type:String,required:true},
    facilities:{type:String,required:true}
},
{timestamps:true}
);

module.exports = mongoose.model("malls",mallschema);

// const createMall = async (mallData) => {
//     const newMall = {
//         id:Date.now().toString(), // Tempo ID
//         name:mallData.name,
//         location:mallData.location,
//         rating:parseFloat(mallData.rating),
//         description:mallData.description,
//         facilities:mallData.facilities || [],
//         createdAt:new Date()
//     };
//     const db = mango.getdb();
//     await db.collection("malls").insertOne(newMall);
//     return newMall;
// };

// const getALLMalls = async () => {
//     const db = mango.getdb();
//     const malls = await db.collection("malls").find().toArray();
//     return malls;
// };

// const getMallById =async (id) => {
//     const db = mango.getdb();
//     return await db.collection("malls").findOne({id:id});
// }

// const updateMall = async (id,updatedata) =>{
//     const db = mango.getdb();
//     const mall = await db.collection("malls").updateOne(
//         {id:id},
//         {$set:updatedata}
//     );
//     if(!mall) return null;
//     return mall;
// }

// const deleteMall = async (id) =>{
//     const db = mango.getdb();
//     const mall = await db.collection("malls").findOne({id:id});
//     if(!mall) return null;
//     await db.collection("malls").deleteOne({id:id});
//     return true;
// }

// const searchMallsByRating = async (minRating) => {
//     const db = mango.getdb();
//     const malls = db.collection("malls").find({rating:{$gt:minRating}}).toArray();
//     return malls;
// }

// module.exports = {
//     createMall,
//     getALLMalls,
//     getMallById,
//     updateMall,
//     deleteMall,
//     searchMallsByRating
// };