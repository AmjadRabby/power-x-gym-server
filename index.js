const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser=require('body-parser');
const cors=require('cors');

require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xu8lv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true });
client.connect(err => {
    const classesCollection = client.db("power-x-gym").collection("classes");
    console.log("database connected");
    app.post('/addProduct',(req,res)=>{
        const newClass=req.body;
       console.log(newClass);
       classesCollection.insertMany(newClass)
        .then(result=>{
            console.log(result.insertedCount);
            res.send(result.insertedCount)
        })
    })

    app.get('/addProduct', (req, res) => {
        classesCollection.find({})
        .toArray( (err, documents) => {
            res.send(documents);
        })
      })
});

app.listen(port)