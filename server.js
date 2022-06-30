const { app } = require('./app');
const { Task } = require('./models/tasks.model');
const { User } = require('./models/users.model');
const { database } = require('./utils/database.util');

database.authenticate()
    .then(() => console.log('database authenticated'))
    .catch(err => console.log(err));

User.hasMany(Task, {foreignKey: 'userId'});
Task.belongsTo(User);


database.sync()
    .then(() => console.log('database synced'))
    .catch(err => console.log(err));

app.listen(6000, () =>{
    console.log("checking server is running");
});