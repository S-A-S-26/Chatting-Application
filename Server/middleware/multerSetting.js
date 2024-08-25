const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const ext= file.originalname.split('.')[1]
      const fileName =req.body._id
      console.log("filename multer setting",req.body,file,fileName)
      const filePath = "./uploads/"+fileName 
      if (fs.existsSync(filePath)) {
        console.log("inside if exists")
        // Delete the file if it exists
        fs.unlinkSync(filePath);
      }
      console.log("create new file")
      cb(null, fileName)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = upload;