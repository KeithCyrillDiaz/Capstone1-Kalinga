import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema ({

    token: {type: String, required: true },
    expiresAt: {type: String, required: true }
})

TokenSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds: 60}
)

export const TokenModel = mongoose.model("token", TokenSchema)
export const getTokenbyToken = (token: string) => TokenModel.findOne({token})
export const createToken = (values: Record<string, any>) => new TokenModel(values).save().then((result) => result.toObject())