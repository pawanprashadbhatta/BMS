const mongoose =require("mongoose")
const bookSchema=new mongoose.Schema({
    bookName: { type: String, required: true },
    bookPrice: { type: String  },
    publishedBy: { type: String  },
    isbnNumber:{type:Number },
    authorName:{type:String },
publishedAt:{type:String },
imageUrl:{type:String}
})

 const Book=mongoose.model("Book",bookSchema)
module.exports=Book