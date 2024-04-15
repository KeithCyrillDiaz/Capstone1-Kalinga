import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema ({

    token: {type: String, required: true },
    expiresAt: {type: Date, required: true }
})

TokenSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds: 60}
)

const CodeSchema = new mongoose.Schema ({
    code: {type: String, required: true },
    expiresAt: { type: Date, required: true }
})

CodeSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds: 14400}
)

export const TokenModel = mongoose.model("token", TokenSchema)
export const CodeModel = mongoose.model("Verification Code", CodeSchema)
export const getTokenbyToken = (token: string) => TokenModel.findOne({token})
export const createToken = (values: Record<string, any>) => new TokenModel(values).save().then((result) => result.toObject())

export const createCode = (values: Record<string, any>) => new CodeModel(values).save().then((result) => result.toObject())
export const getCodeByCode = (code: string) => CodeModel.findOne({code})