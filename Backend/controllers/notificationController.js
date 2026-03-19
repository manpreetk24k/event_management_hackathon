import Notification from '../models/Notification.js';


export async function getNotifications(req, res, next) {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .populate('eventId', 'title')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: notifications.length, notifications });
  } catch (err) {
    next(err);
  }
}


export async function markAsRead(req, res, next) {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    if (notification.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ success: true, notification });
  } catch (err) {
    next(err);
  }
}


export async function markAllAsRead(req, res, next) {
  try {
    await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { isRead: true },
    );

    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    next(err);
  }
}
