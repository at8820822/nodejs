const express = require('express');
const urlRoutes = require('./routes/url');
const URL= require('./model/url');
const {connectToMongoDb} = require('./connect');
const app = express();
const port = 8001;

connectToMongoDb('mongodb://localhost:27017/short-id')
.then(()=>{
    console.log('connected to mongo db');})
.catch((err)=>{
    console.log('error connecting to mongo db', err);
});
app.use(express.json());

app.use("/url",urlRoutes);

app.get('/:shortId', async (req,res)=>{

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId

        },

        {
            $push:{
                visitHistory:{
                    timestamp: Date.now()
                }
            }
        }

);
res.redirect(entry.redirectURL);

});


app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
} )