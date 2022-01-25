const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	didProjects:{
        type:Number
    },
    workingProjects:{
        type:Number
    },
	dateOfJoining: {
		type: Date,
		default: Date.now
	}
});

module.exports=mongoose.model('contact',ContactSchema)