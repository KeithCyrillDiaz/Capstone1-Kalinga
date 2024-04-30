import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema ({

    token: {type: String, required: true },
    expiresAt: {type: Date, required: true }
})

TokenSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds: 60}
)


const LogInTokenSchema = new mongoose.Schema({
    logInToken: {type: String, required: true},
    expiresAt: {type: Date, required: true}
})

LogInTokenSchema.index(
    {expiresAt: 1},
    { expireAfterSeconds: 604800 } // 604800 seconds = 7 days
)

export const TokenModel = mongoose.model("token", TokenSchema)
export const LogInTokenModel = mongoose.model("LogInToken", LogInTokenSchema)

export const createToken = (values: Record<string, any>) => new TokenModel(values).save().then((result) => result.toObject())
export const getToken = (token: string) => TokenModel.findOne({token})
export const deleteToken = (token: string) =>TokenModel.deleteOne({token})

export const createLogInToken = (values: Record<string, any>) => new LogInTokenModel(values).save().then((result) => result.toObject())
export const getLogInToken = (token: string) => LogInTokenModel.findOne({logInToken: token})
export const deleteLogInToken = (token: string) => LogInTokenModel.deleteOne({logInToken: token})


const CodeSchema = new mongoose.Schema ({
    code: {type: String, required: true },
    expiresAt: { type: Date, required: true }
})

CodeSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds: 14400}
)

const PassCodeSchema = new mongoose.Schema ({
    passCode: {type: String, required: true },
    expiresAt: {type: Date, default: Date.now() + 420000 } // 7 minutes in milliseconds
});

PassCodeSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds: 420} 
);


export const CodeModel = mongoose.model("code", CodeSchema)
export const PassCodeModel = mongoose.model("passCode", PassCodeSchema)

export const createCode = (values: Record<string, any>) => new CodeModel(values).save().then((result) => result.toObject())
export const getCode = (code: string) => CodeModel.findOne({code})
export const deleteCode = (code: string) => CodeModel.deleteOne({code})

export const createPassCode = (values: Record<string, any>) => new PassCodeModel(values).save().then((result) => result.toObject())
export const getPassCode = (passCode: string) => PassCodeModel.findOne({passCode})
export const deletePassCode = (passCode: string) => PassCodeModel.findOneAndDelete({passCode})

