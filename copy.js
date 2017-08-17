var mail = require('/home/paperout/mail_modules/mail_send.js');
var server = require('/home/paperout/server_modules/server.js');
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var mysql = require('mysql');

var sequelize = new Sequelize('user', 'root', 'qwer1234', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 5
	},
});

var app = express();
app.locals.pretty = true;
app.set('port', (process.env.PORT || 9941));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var User = sequelize.define('userinfo', {
     id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
      },
     pass:{
	    type: Sequelize.STRING
      },
     name:{
            type: Sequelize.STRING
      },
     schoolNumber:{
	    type: Sequelize.INTEGER
     },
     secondPass:{
            type: Sequelize.STRING
      },
     contractAccount:{
            type: Sequelize.STRING
      },
     privateKey:{
            type: Sequelize.STRING
      },
      
}, {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
});

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
      User.findAll({
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
      User.findOne({where:{id:req.body.id}})
	.then(function(findUser){
	   if((findUser == null || findUser == undefined) == false){
		res.json({
	    	error : "already join id" });
		return;
	   }
      User.create({
            id:req.body.id,
            pass:req.body.pass,
            name:req.body.name,
            schoolNumber:req.body.schoolNumber,
      })
      .then(function(result){
            console.log(result);
            res.json(result);
      })

   })

});

app.post("/user/login", function(req, res){

});

app.delete("/user", function(req,res){
      User.destroy({
            where: {
                  name: req.body.name
            }
      })
      .then(function(result){
            console.log(result);
            res.json(result);
      })
})



//server.selectQuery();
//mail.sendmail();

