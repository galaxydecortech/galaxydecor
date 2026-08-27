// Vercel Catch-All API Route
// Handles ALL /api/* requests (e.g. /api/products, /api/admin/login)
// and forwards them to the Express app in backend/server.js
const app = require('../backend/server');

module.exports = app;
