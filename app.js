const express=require("express")
const { databaseConnection } = require("./database/Database")
const Book = require("./model/bookModel");

//tell node to use dotenv
require("dotenv").config()
const fs=require("fs")


//require cors
const cors=require("cors")

//multer and storage lai require garne from middleware
//upload vanne variable banayera storage banaune tyo lai paxi file upload garda kaam lagxa
const {multer,storage}=require("./middleware/multerConfig")
const upload=multer({storage:storage})
 databaseConnection()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    // origin:"http://localhost:5173"
    origin:'*'
}))

app.get("/",(req,res)=>{
    res.status(201).json({
        status:200,
        message:"i am live"
        ,auther:"pob"
    })
})










//create book
app.post("/book", upload.single("image"),async(req,res)=>{
    
    let fileName ;
    if(!req.file){
        fileName="https://fightersgeneration.com/nf5/char/link-adult-ocarina-of-time-artwork2.jpg"
    }
    else{
        fileName="http://localhost:4000/"+ req.file.filename
      //  console.log(fileName)
    }
    const {bookName,bookPrice,authorName,publishedBy,publishedAt,isbnNumber}=req.body
    
   await Book.create({
        bookName,bookPrice,authorName,publishedBy,publishedAt,isbnNumber,imageUrl:fileName
    })
    return res.status(200).json({
        message:"book created successfully"
    })
})
//find all books
app.get("/books",async(req,res)=>{
    const books=await Book.find()
    return res.status(201).json({
        message:"books fetched successfully",
        data:books

    })
    console.log(books)
}) 
//find one book 
app.get("/book/:id",async(req,res)=>{
    const {id}=req.params
    const book=await Book.findById(id)
    return res.status(201).json({
        message:"single book fetched successfully",
        data:book
    })
})

//delete book api
app.delete("/book/:id",async(req,res)=>{
const {id}=req.params
await Book.findOneAndDelete(id)

return res.status(200).json({
    
    message:"book deleted successfully.."
})
})

// update book
app.patch("/book/:id",upload.single("image"),async(req,res)=>{
const {id}=req.params
    let fileName;
    const {bookName,bookPrice,authorName,publishedBy,publishedAt,isbnNumber}=req.body
    
    const oldDatas= await Book.findById(id)
   // console.log(`the oldData is ${oldDatas}`)
    if(req.file){
        const oldImagePath=oldDatas.imageUrl
        const localhostUrlLength="http://localhost:4000/".length
        const newImagePath=oldImagePath.slice(localhostUrlLength)
      // console.log(`old image url is ${oldImagePath}`)
        console.log(`new image path is ${newImagePath}`)
        fs.unlink(`storage/${newImagePath}`,(err)=>{
if(err){
    console.log(err)
}else{
    console.log("filedeleted successfully")
    fileName="http://localhost:4000/"+req.file.filename


}
        })
    }
    // database maa rakne
   
    const book=await Book.findByIdAndUpdate(id,{bookName,bookPrice,authorName,
        publishedBy,publishedAt,isbnNumber ,imageUrl:fileName})
    return res.status(201).json({
        message:'book updated successfully..'
    })
})

//






app.use(express.static("./storage/"))
 const PORT=process.env.PORT
 app.listen(PORT,()=>{
    console.log(`Server is started at port ${PORT}`)
 })