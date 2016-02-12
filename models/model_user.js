var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        validate: {
            validator: function(email) {
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ["single", "inlove"]
    },
    gender: {
        type: String,
        enum: ["male", "female", "unknown"],
        default: "unknown"
    },
    phone_no: String,
    accessToken: String,
    avatar: String,
    location: String,
    url: String,
    signature: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});

UserSchema.set('autoIndex', false);

// on every save, add the date
userSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  next();
});

module.exports = mongoose.model('User', UserSchema);

// custom method sample
// userSchema.methods.dudify = function() {
//   this.name = this.name + '-dude'; 
//   return this.name;
// };

// // call the custom method. this will just add -dude to his name
// // user will now be Chris-dude
// chris.dudify(function(err, name) {
//   if (err) throw err;

//   console.log('Your new name is ' + name);
// });

// static method
// UserSchema.statics.findByName = function(name, cb){
//    this.find({name: new RegExp(name, 'i')}, cb);
// }
// Animal.findByName('fido', function(err, animals){
//   console.log(animals);
// });



//Virtual
//get
//personSchema.virtual('name.full').get(function(){
//     return this.name.first + ' ' + this.name.last; 
// );
// console.log(bad.name.full);
// 
// set
// personSchema.virtual('name.full').set(function(name){
//    var split = name.split(' ');
//    this.name.first = split[0];
//    this.name.last = split[1];
// });
// mad.name.full = "Breaking Bad";



