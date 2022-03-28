import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
	{
		login: String,
		name: String,
		cpf: String,
		domain: String,
		userDomain: String,
		authenticationType: String,
		password: String,
		passwordLength: Number,
		createdAt: Date,

		passports: [
			{
				name: String,
				createdAt: {
					type: Date,
					default: new Date(),
				},
				expires: {
					type: Date,
					default: null,
				},
			},
		],

		active: {
			type: Boolean,
			default: false,
		},

		historic: [
			{
				dateTime: {
					type: Date,
					default: Date.now,
				},
				admin: {
					id: String,
					login: String,
				},
				information: String,
			},
		],
	},
	{ collection: 'users' }
);

export const MongoUser = mongoose.model('USER_MODEL', UserSchema);
