var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var dotenv = require('dotenv').config();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*app.use(bodyParser.text({
    type: function(req){
        return 'text';
    }
}));*/

app.use(passport.initialize());

var router = express.Router();

//Function that checks for headers and parameters
function responseFunc(check, req, res)
{
    var headerVar = req.headers;
    var paramVar = req.body;
    if(Object.keys(req.headers).length === 0 && Object.key(req.body).length === 0)
    {
        headerVar = "No headers found!";
        paramVar = "No Params found!";
    }
    else if(Object.keys(req.body).length === 0 && Object.keys(req.headers !== 0))
    {
        paramVar = "No parameters found!";
    }
    else if(Object.keys(req.headers).length === 0 && Object.keys(req.body !== 0))
    {
        headerVar = "No headers found!";
    }

    res.status(200).json({ message: check, parameters: paramVar, headers: headerVar, UNIQUE_KEY: process.env.UNIQUE_KEY});

}

router.route('/post')
    .post(function (req, res){
        responseFunc('post', req, res);
    });

router.route('/put')
    .put(function (req, res){
        responseFunc('put', req, res);
    });

router.route('/get')
    .get(function (req, res){
        responseFunc('get', req, res);
    });

router.route('/delete')
    .delete(function (req, res){
        responseFunc('delete', req, res);
    });

router.route('/authorize')
    .post(authController.isAuthenticated, function (req, res)
    {
        console.log(req.body);
        res = res.status(200);
        if(req.get('Content-Type'))
        {
            console.log("Content-Type: " + req.get('Content-Type'));
            res = res.type(req.get('Content-Type'));
        }
        res.send(req.body);
    });


app.use('/', router);
app.listen(process.env.PORT || 8080);


/*app.post('/post', function (req, res){
    console.log(req.body);
    res = res.status(200);
    if(req.get('Content-Type')){
        console.log("Content-Type: " + req.get('Content-Type'));
        res = res.type(req.get('Content-Type'));
    }
    res.send(req.body);
}); */

//http.createServer(app).listen(8080);
//http.createServer(app).listen(process.env.PORT || 8080);