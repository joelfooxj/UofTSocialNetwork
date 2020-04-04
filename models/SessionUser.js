/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
	}, 
	password: {
		type: String,
		required: true,
		minlength: 1
	},
    firstName: {
		type: String,
		required: true,
		minLength: 1
	},
	lastName: {
		type: String,
		required: true,
		minLength: 1
	},
	email: {
		type: String,
		required: true,
		minLength: 1,
		unique: true
	},
	permissions: {
		type: Number,
		required: true,
	},
	clubsExecOf: {
		type: Array
	},
	clubsMemberOf: {
		type: Array
	},
	clubsFollowing: {
		type: Array
	},
	clubsAwaitingJoin: {
		type: Array
	},
	timelineOpts: {
		type: Array
	},
	status: {
		type: Number
	}
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.resolve(null)  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

// make a model using the User schema
//FIRST ARGUMENT TO MODEL IS THE COLLECTION NAME!!!
//It will change it to be '1st arg' + 's'
const User = mongoose.model('User', UserSchema)
module.exports = { User }
