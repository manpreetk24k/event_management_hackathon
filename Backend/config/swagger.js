import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MNSS Event Management API',
      version: '1.0.0',
      description: 'API documentation for the MNSS Event Management System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            role: { type: 'string', enum: ['organizer', 'attendee'], example: 'attendee' },
            avatar: { type: 'string', example: '' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Event: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60d0fe4f5311236168a109cb' },
            title: { type: 'string', example: 'Tech Conference 2026' },
            description: { type: 'string', example: 'Annual technology conference' },
            date: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            location: { type: 'string', example: 'Convention Center, NYC' },
            category: { type: 'string', example: 'Technology' },
            maxAttendees: { type: 'integer', example: 500 },
            coverImage: { type: 'string', example: '' },
            organizerId: { $ref: '#/components/schemas/User' },
            status: { type: 'string', enum: ['draft', 'published'], example: 'published' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Registration: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60d0fe4f5311236168a109cc' },
            eventId: { type: 'string', example: '60d0fe4f5311236168a109cb' },
            userId: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            registeredAt: { type: 'string', format: 'date-time' },
            status: { type: 'string', enum: ['active', 'cancelled'], example: 'active' },
          },
        },
        Notification: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60d0fe4f5311236168a109cd' },
            userId: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            type: { type: 'string', enum: ['reminder', 'deadline', 'update'], example: 'update' },
            message: { type: 'string', example: 'New registration for your event' },
            eventId: { type: 'string', example: '60d0fe4f5311236168a109cb' },
            isRead: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
