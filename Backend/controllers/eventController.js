import Event from '../models/Event.js';
import Registration from '../models/Registration.js';


export async function createEvent(req, res, next) {
  try {
    req.body.organizerId = req.user.id;
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, event });
  } catch (err) {
    next(err);
  }
}


export async function getEvents(req, res, next) {
  try {
    const { search, category, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = { status: 'published' };

    
    if (search) {
      query.$text = { $search: search };
    }

    
    if (category) {
      query.category = category;
    }

    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [events, total] = await Promise.all([
      Event.find(query)
        .populate('organizerId', 'name email')
        .sort({ date: 1 })
        .skip(skip)
        .limit(limitNum),
      Event.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: events.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      events,
    });
  } catch (err) {
    next(err);
  }
}


export async function getEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id).populate('organizerId', 'name email');

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (err) {
    next(err);
  }
}


export async function updateEvent(req, res, next) {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    
    delete req.body.organizerId;

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, event });
  } catch (err) {
    next(err);
  }
}


export async function deleteEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
   
    await Registration.deleteMany({ eventId: req.params.id });

    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
}

export async function getMyEvents(req, res, next) {
  try {
    const events = await Event.find({ organizerId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: events.length, events });
  } catch (err) {
    next(err);
  }
}

export async function getEventStats(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const registrationCount = await Registration.countDocuments({
      eventId: req.params.id,
      status: 'active',
    });

    res.json({
      success: true,
      stats: {
        registrationCount,
        maxAttendees: event.maxAttendees,
        seatsLeft: event.maxAttendees - registrationCount,
      },
    });
  } catch (err) {
    next(err);
  }
}
