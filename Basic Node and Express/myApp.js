let express = require('express');
let bodyParser = require('body-parser')
const path = require('path');
require('dotenv').config();

let app = express();
app.use(bodyParser.urlencoded({extended: false}))
console.log('Hello World')
app.use('/public/style.css', express.static(path.join(__dirname, 'public/style.css')));
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.get('/',(req,res)=>{
    //res.send('Hello Express')
    absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath)
});
app.get('/json', (req,res)=>{
    if(process.env ["MESSAGE_STYLE"]=="uppercase"){
        res.json({"message":"HELLO JSON"})
    }else{
        res.json({"message":"Hello json"})
    }  
});

app.get('/now',(req,res,next)=>{
    req.time = new Date().toString();
    next()
},(req,res)=>{
    res.json({'time': req.time})
}
)
app.get("/:word/echo",(req,res)=>{
    res.json({echo: req.params.word})
})

app.get('/name',(req,res)=>{
    res.json({name: req.query.first+ ' '+req.query.last})
})

app.post('/name',(req,res)=>{
    res.json({name: req.body.first+ ' '+req.body.last })
})






























 module.exports = app;
