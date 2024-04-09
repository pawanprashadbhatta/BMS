const multer=require("multer")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
    
                                 const allowedFileType=["image/png","image/jpg","image/jpeg"]
        if(!allowedFileType.includes(file.mimetype)){
            cb(new Error("unsupported file type.."))
            return
        }
        cb(null,"./storage")  
        //->cb(error ,success)
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
    })
module.exports={multer,
storage} 
