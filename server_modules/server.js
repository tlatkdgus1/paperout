var model = require('/home/paperout/server_modules/model.js');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var dbConnection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwer1234',
			database: 'user'
		   });


var app = express();
app.locals.pretty = true;
app.set('port', (process.env.PORT || 9941));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
   key: 'session',
   secret: 'hellochain!@#',
   resave: false,
   saveUninitialized: true
}));

function successMsg(code, msg){
      this.code = code;
      this.msg = msg;
}

app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req, res) {
      sequelize
      .authenticate()
      .then(function(err) {
            console.log('Connection has been established successfully.');
            res.json({
                  name : "test"
            });
      })
      .catch(function (err) {
            console.log('Unable to connect to the database:', err);
            res.json({
                  name : "test"
            });
      });
});


app.get('/user/:id', function(req, res) {
      var id = req.params.id;
      model.User.findAll({
            where: {
                  id: id
            }
      })
      .then(function(results){
            res.json(results);
      })
});

app.post("/user/register", function(req,res){
      console.log(req.body);
      model.User.findOne({where:{id:req.body.id}})
        .then(function(findUser){
           if((findUser == null || findUser == undefined) == false){
                res.json({
                   msg : "already join id" 
		});
                return;
           }
      model.User.create({
            id:req.body.id,
            pass:req.body.pass,
            name:req.body.name,
            schoolNumber:req.body.schoolNumber,
      })
      .then(function(result){
	sess = req.session;
        sess.username = req.body.id
        res.json(sess);
      })

   })

});

app.post("/user/login", function(req, res){
    console.log(req.body);
    model.User.findOne({where:{id:req.body.id,pass:req.body.pass}})
	.then(function(findUser){
	if((findUser == null || findUser == undefined) == true){
		res.json({
		   msg : "ID or PASS invalid"
		});
		return;
	}

	sess = req.session;
	sess.username = req.body.id
	res.json(sess);
	
   }
)});

app.get('/session', function(req, res) { 
  res.send('user : ' + req.session.name);
});

app.delete("/user", function(req,res){
      model.User.destroy({
            where: {
                  name: req.body.name
            }
      })
      .then(function(result){
            console.log(result);
            res.json(result);
      })
})

