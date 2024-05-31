import mongoose from 'mongoose'
import moment from 'moment'
import randomatic from 'randomatic'

const notificationSchema = new mongoose.Schema({
    notificationId: { type: String, default: () => randomatic('a0', 7) + moment().format("YYYYMMDDHHmmss") },
    ownerID: { type: String },
    title: { type: String },
    content: { type: String },
    status: { type: String, default: "Unread" },
    milkBank: { type: String },
    date: { type: String },
    time: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => moment().add(30, 'days').toDate() } // Expire after 30 days
});

notificationSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 2592000 } // 2592000 seconds = 30 days
  );

export const NotificationModel = mongoose.model("Notifications", notificationSchema)

export const createNotification = (values: Record<string, any>) => new NotificationModel(values).save().then((results) => results.toObject())
export const getNotificationById = (id: string) => NotificationModel.find({ownerID: id})
export const getNotificationByIdAndUnread = (id: string) => NotificationModel.find({ownerID: id, status: "Unread"})
export const updateStatusNotification = (id: string) => NotificationModel.findOneAndUpdate({notificationId: id}, {$set: {status: "Read", updatedAt: Date.now()}}, {new: true})
export const deleteNotification = (id: string) => NotificationModel.findOneAndDelete({notificationId: id})