import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({

    serviceNum: { type: Number, required: true },
    serviceType: { type: String, required: true }
});

export const Service = mongoose.model('Service', serviceSchema);