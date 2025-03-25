const express = require('express');
const router = express.Router();
const prospectController = require('../controllers/prospectController');

// GET /api/prospects - Get all prospects
router.get('/', prospectController.getProspects);

// GET /api/prospects/:id - Get a specific prospect
router.get('/:id', prospectController.getProspect);

// POST /api/prospects - Create a new prospect
router.post('/', prospectController.createProspect);

// PUT /api/prospects/:id - Update a prospect
router.put('/:id', prospectController.updateProspect);

// DELETE /api/prospects/:id - Delete a prospect
router.delete('/:id', prospectController.deleteProspect);

// POST /api/prospects/:id/notes - Add a note to a prospect
router.post('/:id/notes', prospectController.addNote);

// POST /api/prospects/:id/activities - Add an activity to a prospect
router.post('/:id/activities', prospectController.addActivity);

module.exports = router; 