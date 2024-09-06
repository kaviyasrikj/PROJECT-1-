const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser= require('body-parser');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://kaviya:Kaviya13@cluster0.sz4ie.mongodb.net/',{
useNewUrlParser: true,
useUnifiedTopology:true,
})
.then(() => console.log('connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:',err));

const FormData = require('./models/FormData');

app.get('/', (req, res) => {
    res.send('Server is working')
})

app.post('/submit', async(req,res) => {
    const{name, email, message} = req.body;
try{
const formData = new FormData({name, email, message});
await formData.save();
res.status(201).json({message:  'Form data saved successfully' });
}catch(error){
    res.status(500).json({error:  'Failed to save from data' });
}
   });   
   app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
   });

