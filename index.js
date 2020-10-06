const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = "mongodb+srv://volentearN:volentear12@cluster0.bdvqy.mongodb.net/volenteae?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const handel = client.db("volenteae").collection("register");
  
  app.post('/registering', (req ,res ) => {
    const newRegister = req.body;
    handel.insertOne(newRegister)
    .then(data => {
      res.send(data.insertedCount > 0);
    })
    
    })

    app.get('/handel' , (req,res) => {
      handel.find({})
      .toArray((err , document) => {
        res.send(document);
      })
      })
  
});




app.listen(port);