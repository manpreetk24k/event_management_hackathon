import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 5000,
  },
  date: {
    type: Date,
    required: [true, 'Event start date is required'],
  },
  endDate: {
    type: Date,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  maxAttendees: {
    type: Number,
    required: [true, 'Max attendees is required'],
    min: 1,
  },
  coverImage: {
    type: String,
    default: '',
  },
  organizerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
}, {
  timestamps: true,
});


eventSchema.index({ title: 'text', description: 'text', category: 'text' });
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ organizerId: 1 });

export default model('Event', eventSchema);
