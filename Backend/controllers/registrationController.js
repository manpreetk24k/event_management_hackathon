import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import Notification from '../models/Notification.js';
import { getIO } from '../utils/socket.js';


export async function registerForEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.status !== 'published') {
      return res.status(400).json({ success: false, message: 'Event is not open for registration' });
    }

   
    const activeCount = await Registration.countDocuments({
      eventId: event._id,
      status: 'active',
    });

    if (activeCount >= event.maxAttendees) {
      return res.status(400).json({ success: false, message: 'Event is full' });
    }

   
    const existing = await Registration.findOne({
      eventId: event._id,
      userId: req.user.id,
    });

    if (existing && existing.status === 'active') {
      return res.status(400).json({ success: false, message: 'Already registered for this event' });
    }

    let registration;
    if (existing && existing.status === 'cancelled') {
      
      existing.status = 'active';
      existing.registeredAt = new Date();
      registration = await existing.save();
    } else {
      registration = await Registration.create({
        eventId: event._id,
        userId: req.user.id,
      });
    }

    
    const notification = await Notification.create({
      userId: event.organizerId,
      type: 'update',
      message: `New registration for "${event.title}"`,
      eventId: event._id,
    });

   
    const io = getIO();
    const newCount = await Registration.countDocuments({
      eventId: event._id,
      status: 'active',
    });

    io.emit('event:registration-update', {
      eventId: event._id.toString(),
      registrationCount: newCount,
      seatsLeft: event.maxAttendees - newCount,
    });

    io.to(`user:${event.organizerId.toString()}`).emit('notification:new', notification);

    res.status(201).json({ success: true, registration });
  } catch (err) {
    next(err);
  }
}


export async function cancelRegistration(req, res, next) {
  try {
    const registration = await Registration.findOne({
      eventId: req.params.id,
      userId: req.user.id,
      status: 'active',
    });

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    registration.status = 'cancelled';
    await registration.save();

  
    const event = await Event.findById(req.params.id);
    if (event) {
      const io = getIO();
      const newCount = await Registration.countDocuments({
        eventId: event._id,
        status: 'active',
      });
      io.emit('event:registration-update', {
        eventId: event._id.toString(),
        registrationCount: newCount,
        seatsLeft: event.maxAttendees - newCount,
      });
    }

    res.json({ success: true, message: 'Registration cancelled' });
  } catch (err) {
    next(err);
  }
}


export async function getEventRegistrations(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const registrations = await Registration.find({ eventId: req.params.id })
      .populate('userId', 'name email')
      .sort({ registeredAt: -1 });

    res.json({ success: true, count: registrations.length, registrations });
  } catch (err) {
    next(err);
  }
}


export async function getMyRegistrations(req, res, next) {
  try {
    const registrations = await Registration.find({ userId: req.user.id })
      .populate({
        path: 'eventId',
        populate: { path: 'organizerId', select: 'name email' },
      })
      .sort({ registeredAt: -1 });

    res.json({ success: true, count: registrations.length, registrations });
  } catch (err) {
    next(err);
  }
}


export async function exportRegistrations(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const registrations = await Registration.find({
      eventId: req.params.id,
      status: 'active',
    }).populate('userId', 'name email');

    
    const header = 'Name,Email,Registered At,Status\n';
    const rows = registrations.map((r) => {
      const name = r.userId ? r.userId.name : 'Deleted User';
      const email = r.userId ? r.userId.email : '';
      return `"${name}","${email}","${r.registeredAt.toISOString()}","${r.status}"`;
    });

    const csv = header + rows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=registrations-${event._id}.csv`);
    res.send(csv);
  } catch (err) {
    next(err);
  }
}
