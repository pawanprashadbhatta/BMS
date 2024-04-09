const mongoose=require("mongoose")

exports.databaseConnection=async()=>{
    const URI= process.env.URI
await mongoose.connect(URI)
console.log("database connected successfully.💞")
}