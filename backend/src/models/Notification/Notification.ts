import mongoose from 'mongoose'
import moment from 'moment'
import randomatic from 'randomatic'

const notificationSchema = new mongoose.Schema({

    notificationId: {type: String, default: () => randomatic('a0', 7) + moment().format("YYYYMMDDHHmmss") },
    ownerID:{type: String},
    title: {type: String},
    content: {type: String},
    status: {type: String, default: "Unread"},
    milkBank: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}

})

export const NotificationModel = mongoose.model("Notifications", notificationSchema)

export const createNotification = (values: Record<string, any>) => new NotificationModel(values).save().then((results) => results.toObject())
export const getNotificationById = (id: string) => NotificationModel.find({ownerID: id})
export const updateStatusNotification = (id: string) => NotificationModel.findOneAndUpdate({notificationId: id}, {$set: {status: "Read", updatedAt: Date.now()}}, {new: true})
export const deleteNotification = (id: string) => NotificationModel.findOneAndDelete({notificationId: id})