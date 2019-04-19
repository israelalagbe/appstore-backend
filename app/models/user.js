var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var ObjectId = mongoose.Schema.Types.ObjectId
var UserSchema = new mongoose.Schema({

    /* email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    }, */
    display_name: {
        type: String,
    },
    username: {
        type: String,
        lowercase: false,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'owner'],
        default: 'owner',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    owner:{
        type:ObjectId,
        ref:'Owner'
    }
}, {
   /*  v
    timestamps: true, */
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
        }
    }
})
UserSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 5;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next()
        })
    })
})
UserSchema.methods.verifyPassword = function (passwordAttempt) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {

            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    })


}
/* UserSchema.virtual('owner').get(function (value,next) {
    console.log(value,next)
    return "jdjdjjd"
    return new Promise((resolve, reject) => {
         resolve("Israel Alagbe");
    })
}) */
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({
        email
    })
}
UserSchema.statics.findByUsername = function (username) {
    return this.findOne({
        username
    })//.populate('owner')
}
module.exports = mongoose.model('User', UserSchema);