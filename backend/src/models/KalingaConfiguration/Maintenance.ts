import mongoose from 'mongoose'


const  maintenanceSchema = new mongoose.Schema({
    maintenanceStatus: {type: Boolean, default: false}
})

export const MaintenanceModel = mongoose.model('Maintenance', maintenanceSchema)
export const createMaintenanceModel = (values = {}) => new MaintenanceModel(values).save().then((result) => result.toObject());