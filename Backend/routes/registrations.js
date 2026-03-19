import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { registerForEvent, cancelRegistration, getEventRegistrations, getMyRegistrations, exportRegistrations } from '../controllers/registrationController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: Event registration endpoints
 */

/**
 * @swagger
 * /api/registrations/my:
 *   get:
 *     summary: List current user's registrations
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's registrations with populated event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                 registrations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Registration'
 */
router.get('/my', protect, getMyRegistrations);

export default router;

const eventRegistrationRouter = Router({ mergeParams: true });

/**
 * @swagger
 * /api/events/{id}/register:
 *   post:
 *     summary: Register current user for an event
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 registration:
 *                   $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Event full, not published, or already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Cancel registration
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Registration cancelled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration cancelled
 *       404:
 *         description: Registration not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRegistrationRouter.post('/register', protect, registerForEvent);
eventRegistrationRouter.delete('/register', protect, cancelRegistration);

/**
 * @swagger
 * /api/events/{id}/registrations:
 *   get:
 *     summary: List registrations for an event (organizer only)
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: List of registrations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                 registrations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Registration'
 *       403:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRegistrationRouter.get(
  '/registrations',
  protect,
  authorize('organizer'),
  getEventRegistrations,
);

/**
 * @swagger
 * /api/events/{id}/registrations/export:
 *   get:
 *     summary: Export attendee list as CSV (organizer only)
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: CSV file download
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *       403:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRegistrationRouter.get(
  '/registrations/export',
  protect,
  authorize('organizer'),
  exportRegistrations,
);

const _eventRegistrationRouter = eventRegistrationRouter;
export { _eventRegistrationRouter as eventRegistrationRouter };
