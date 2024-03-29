import mongoose from 'mongoose';

// const moment = require('moment');
// const currentTime = moment();
// const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
//console.log(formattedTime);


const hepaBTestResultSchema = new mongoose.Schema({

    Applicant_ID: {type: Number},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
    filename: {type: String},
    contentType: {type: String},
    data: {type: Buffer},

});


// const tokenSchema = new mongoose.Schema({

//     token: {type: String},
//     createdAt: { type: Date},
//     expiry: {type:String} 
 

// });

// const adminSchema = new mongoose.Schema({

//     username: {type: String},
//     password: {type: String},
 
// });


export const userModel = mongoose.model('User', userSchema)
export const tokenModel = mongoose.model('Token', tokenSchema);
export const adminModel = mongoose.model('Admin', adminSchema);

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({email});
export const getUserById = (id: string) => userModel.findById(id);

export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());

//export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id})

export const createToken = (values: Record<string, any>) => new tokenModel(values).save().then((token) => token.toObject());
export const getToken = () => tokenModel.find();
export const getTokenByToken = (token: string) => tokenModel.findOne({token});
export const getTokenByExpiry = (expiry: string) => tokenModel.findOne({expiry});
export const deleteTokenByToken = (token: string) => tokenModel.findOneAndDelete({token: token})

export const getAdminByUsername = (username: string) => adminModel.findOne({username});
// export const updateMarkerPosition = (Position: {lat: number, lng: number}) => MarkerModel.findOneAndUpdate({position: {lat: lat, lng: lng}})
// Methods of DB = findOneAndUpdate