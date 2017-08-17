var Sequelize = require("sequelize");

var sequelize = new Sequelize('user', 'root', 'qwer1234', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
                max: 5,
                min: 0,
                idle: 5
        },
});

exports.User = sequelize.define('userinfo', {
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

