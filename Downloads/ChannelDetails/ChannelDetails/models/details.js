import mongoose from 'mongoose';

const detailsSchema = new mongoose.Schema({
  serialNo: {  type: Number, unique: true, min: 1, max: 100, required: true  },
  date: { type: Date, required: true },
  customerName: { type: String, required: true },
  last4digitNo: { type: String, required: true },
  listOfChannelPartner: { type: String, required: true },
  agentPhoneNo: { type: String, required: true },
  project: { type: String, required: true },
  attendant: { type: String, required: true },
});

detailsSchema.pre('save', async function(next) {
  try {
    if (!this.isNew) {
      return next(); 
    }

   
    const highestSerial = await detailsSchema.findOne({}, {}, { sort: { serialNo: -1 } });
    if (highestSerial) {
      this.serialNo = highestSerial.serialNo + 1;
    } else {
      this.serialNo = 1; 
    }
    next();
  } catch (error) {
    next(error);
  }
});


detailsSchema.post('remove', async function(doc) {
  try {
    
    const channels = await Channel.find({ serialNo: { $gt: doc.serialNo } });
    
    
    for (const channel of channels) {
      channel.serialNo -= 1;
      await channel.save();
    }
  } catch (error) {
    console.error('Error adjusting serialNo after deletion:', error);
  }
});

const Details = mongoose.model('Details', detailsSchema);

export default Details;
