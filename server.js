const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now =new Date().toString(); 
    var log =`${now}:${req.method} ${req.url}`;
    next();
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    })
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
   var date = new Date().getFullYear();
   return date;
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
    
});

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        // welcomePage: 'WELCOME USER',
        pageTitle:'ABOUT PAGE'
        // name : 'Neeti',
        // likes :[
        //     'Reading',
        //     'Art and Craft'
        // ]
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
});
    // res.send('<h1>About Page<h1>');
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'Unable to handle request'
    });
})
app.listen(port,()=>{
    console.log(`Server is listening at ${port}`);
});