const shortid= require('shortid');

const URL= require('../model/url');

async  function handleGenerateNewShortUrl(req,res){

    const body = req.body;
    if(!body.url )
        return res.status(400).json({error: 'Url is required'});

const shortId = shortid();
await URL.create({
 shortId: shortId,

redirectURL:body.url,
 vsitHistory:[],

});
return res.json({id: shortId});

}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId});
    
    return res.json({ analytics: entry.visitHistory.length,visitHistory: entry.visitHistory});
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}