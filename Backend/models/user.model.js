const mon = require('mongoose');
const Schema = mon.Schema;

const userSchema = new mon.Schema({
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mon.model('User', userSchema);