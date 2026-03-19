import { Schema, model } from 'mongoose';

const registrationSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active',
  },
});


registrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

export default model('Registration', registrationSchema);
