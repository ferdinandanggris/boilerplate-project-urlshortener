require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require("body-parser");
const dns = require('dns');

let arrShort = ["https://freeCodecamp.org"];

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',function(req,res){
  console.log(req.body);
  const REPLACE_REGEX = /^https?:\/\//i;
  let url = req.body.url.replace(REPLACE_REGEX,'');
  dns.lookup(url,function(err,result){
    if(err==null){
      let i = arrShort.length;
      arrShort.push(req.body.url);
      res.send({original_url : req.body.url, short_url: i});
    }else{
      res.send({error:"invalid url"});
    }
  })
});

app.get('/api/shorturl/:short_url?',function(req,res){
  // console.log(req.params.short_url);
  if(arrShort[(Number(req.params.short_url))] !== null){
 res.redirect(arrShort[(Number(req.params.short_url))]);
  }
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
