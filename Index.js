import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import multer from 'multer'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use('/upload', express.static('upload'));

mongoose.connect("mongodb://localhost:27017/database", {
    useNewUrlParser: true,
    useUnifiedTopology: true}
).then(()=>{
    console.log("connected")
}).catch((e)=>{
    console.log("not connected")
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)


//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
})   
// Multer used for Upload file


const imageSchema = new mongoose.Schema({
    photo: String,
    // id: {
    //     type:Number,
    //     unique:true
    // }
})

const Image = mongoose.model("Image", imageSchema)


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});


const upload = multer({
    storage: storage
})

// const router = express.Router();
var ig
var getImageById = (req, res, next, id) => {
    Image.findById(id)
                .exec((err, image) => {
                    if(err){
                        return res.status(400).json({
                            message: "Unable to find  form in DB",
                        })
                    }
                    req.image = image
            next()

                })  
}

app.param('imageId', getImageById)

app.post('/file/create', upload.single('photo') ,(req, res) => {
    const image = new Image({
        // id: new mongoose.Types.ObjectId(),
        _id: new mongoose.Types.ObjectId(),
        photo: req.file.path
    })
    console.log(image)
    
    image.save((err, image) => {
        if(err){
            return res.status(400).json({
                error: "Unable to upload file",
            })
        }
        res.json(image)
    })
})

app.get('/images', (req, res) => {
    Image.find().exec((err, image) => {
        if(err){
            return res.status(400).json({
                message: "image NOT FOUND",
                success: false
            })
        };
        res.json(image);
    })
})

// Uses for Delete

app.delete('/image/:imageId', (req, res) => {
    console.log(req.image, ig)
    const image = req.image;
    image.remove((err, deleteImage) => {
        if(err){
            return res.status(400).json({
                message: "file not DELETED",
            })
        }
        res.json({
            message: `file ${deleteImage} DELETED SUCCESFULLY`,
        })
    })
})


app.listen(5000,() => {
    console.log("BE started at port 5000")
})